
import React from 'react';
import { withStyles } from '@material-ui/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
var ENDPOINT= process.env.URL_ENDPOINT;





const styles = {
mainDiv: {

padding:'1%',
margin:'0',
backgroundColor:"#fef9e6"

},
root: {
width: '100%',
maxWidth: '360px',

paddingLeft:"2%"
},
but:{
height:'100%',
color:'black',
cursor:'pointer',
  },
text:{
color:'red',
margin:0
  }

};






class ItemAdder extends React.Component {
        

    

    constructor(props){
      
    super(props);
      
    this.state ={
            Type:'',
            Condition:'',
            Item:'',
            labelWidth: 0,
            options:[],
            cuisines:[],
            flavors:[],
            types:[],
            loading:'',
            selected:[],
            selection:"",
            addSelection:"types",
            condition:null,
            user:{} ,
            userId:null,
          }


    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getFoodDataFromDb = this.getFoodDataFromDb.bind(this);
    this.checkOptions =this.checkOptions.bind(this)
    this.addOrDelete =this.addOrDelete.bind(this)
    this.setReset =this.setReset.bind(this)

    }


  

    componentWillMount(){
       

    }

    componentDidMount(){
     this.setState({userId:this.props.userId})
    this.getUserInfo(this.state.userId)
    this.getFoodDataFromDb()
   

   
    }


componentWillReceiveProps(nextProps){
  this.setState({userId:nextProps.userId})

  this.getUserInfo(nextProps.userId)

}







  //-------------------------------Database calls------------------------------------------------------

    getFoodDataFromDb = () =>  {
        fetch(ENDPOINT + "/api/getData")
          .then(data => data.json())
          .then((res) => {this.setState({ options: res.data[0].options,
                                       cuisines: res.data[0].cuisines, 
                                       flavors: res.data[0].flavors,
                                       types: res.data[0].types}))
          console.log(res.data)};
      }


    addFoodItemToDb(ID, food, selection){

     axios.post(ENDPOINT + "/api/addUnknownItemToFoods/", {
        id: ID,
        update: food,
        category:selection
      })
        .then(res => console.log(res))
        .then(this.getUserInfo(this.state.user._id))

    }


    getUserInfo(user){

     fetch(ENDPOINT + "/api/getUserinfo/" + user)
          .then(data => data.json())
          .then(res => this.setState({ user:res.data}))
          .then(if(this.state.Type){this.checkOptions(this.state.Type)});
    }


    deleteItemFromUser(ID, food, selection){

      
      axios.post(ENDPOINT + "/api/removefromUser",{
          id: ID,
          update: food,
          category:selection
        })
          .then(res => console.log(res))
       .then(this.getUserInfo(this.state.user._id))
    }

    addNewItemtoFoods(food){
      
       axios.post(ENDPOINT + "/api/addUnknownItemToFoods/" + food)
        .then(res => console.log(res))

    }




     addOrDelete = () =>{   
     
          if(this.state.Condition === "Add" && !this["state"]["user"][this.state.selection].includes(this.state.Item)){
            
          fetch(ENDPOINT + "/api/getData")
            .then(data => data.json())
            .then(res => {
                 

                  if(res.data[0].foods.includes(this.state.Item) || (this.state.item !== "foodLikes" && this.state.item !== "foodDislikes")){

                      this.addFoodItemToDb(this.state.user._id,this.state.Item,this.state.selection);
                      
                      this.setReset()
                  }else{

                      this.addNewItemtoFoods(this.state.Item);
                      this.setReset();

                      this.setState({
                        Condition:"Error"
                      })
                  

                    //Handle not a food item
                  }

                  })


          }else if(this.state.Condition ==="Delete"){

          this.deleteItemFromUser(this.state.user._id,this.state.Item,this.state.selection)
          this.setReset()
          
          }
      

     }


//=-----------------------------------------------------------------------------------------










    setReset(){
      this.setState({
        Condition:"",
        Item:"",
        Type:""
      })
      this.getUserInfo(this.state.user._id);
    }

 


   checkOptions = (input) =>{
    

     if(input === "Cuisines likes" ){
    
      this.setState({selected: this.state.user.cuisinesLikes,
                      selection:"cuisinesLikes",
                      addSelection:"cuisines"})

     }else  if(input === "Cuisines dislikes"){
    
      this.setState({selected: this.state.user.cuisinesDislikes,
                      selection:"cuisinesDislikes",
                      addSelection:"cuisines"})

     }else if( input === "Food likes"){
      
       this.setState({selected:this.state.user.foodLikes,
                      selection:"foodLikes",
                      addSelection:"types"})

     }else if( input === "Food dislikes" ){
      
       this.setState({selected:this.state.user.foodDislikes,
                      selection:"foodDislikes",
                      addSelection:"types"})

     }else if( input === "Flavor likes" ){
   
       this.setState({selected:this.state.user.flavorLikes,
                      selection:"flavorLikes",
                      addSelection:"flavors"})

     }else if(input === "Flavor dislikes"){
   
       this.setState({selected:this.state.user.flavorDislikes,
                      selection:"flavorDislikes",
                      addSelection:"flavors"})

     }

   }



  handleChange = event => {
    console.log(event)
    this.setState({ [event.target.name]: event.target.value });
    this.checkOptions(event.target.value );
  };




  handleChangeText = event => {
    
    this.setState({ Item: event.target.value });
   
  };











  render() {

  const { classes } = this.props
 


  


  

    return (
      //Title question

      <div className={classes.mainDiv}>


      <Grid container spacing={8}>

       <Grid item xs={12} sm={12}>
           <Typography variant="h5" gutterBottom>
        Our tastes change over time, update your likes/dislikes.
      </Typography>

       </Grid>




           {/*  Add/Delete selection box  */}

           <Grid item xs={12} sm={3}>
         

         <FormControl variant="outlined" className={classes.root}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-simple"
          >
            What would you like to do ?
          </InputLabel>
          <Select
            value={this.state.Condition}
            onChange={this.handleChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="Condition"
                id="outlined-age-simple"
              />
            }
          >
          

          <MenuItem  value="Add">Add</MenuItem>
           <MenuItem  value="Delete">Delete</MenuItem>)

        
           
          </Select>
        </FormControl>

        </Grid>




          
           {/*  options selection box  */}

          <Grid item xs={12} sm={3}>


         <FormControl variant="outlined" className={classes.root}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-simple"
          >
           Selection
          </InputLabel>
          <Select
            value={this.state.Type}
            onChange={this.handleChange}
            input={
              <OutlinedInput
                labelWidth= {this.state.labelWidth}
                name="Type"
                id="outlined-age-simple"
              />
            }
          >
             {/*  loop through and populate options box  */}

            {this.state.options.map((option,index)=>{
            return  (

          <MenuItem key={"menuitem" + index} value={option}>{option}</MenuItem>)

          }
           )}
            
          </Select>
        </FormControl>

        </Grid>





           {/*  Type to add/delete selection box  */}

           <Grid item xs={12} sm={3}>
    
                     {/*  Render selection box depending on selections*/}        
                       {(this.state.selection === "foodLikes" && this.state.Condition !== "Delete") || (this.state.selection ==="foodDislikes" && this.state.Condition !== "Delete") ?
                                  
                                  <FormControl variant="outlined" className={classes.root}>
                                        <InputLabel
                                          ref={ref => {
                                          this.InputLabelRef = ref;
                                          }}
                                          htmlFor="outlined-age-simple"
                                        >
                                        Item
                                        </InputLabel>

                                        <OutlinedInput
                                          placeholder="Item"
                                          className={classes.root}
                                          value={this.state.Item}
                                          onChange={this.handleChangeText}
                                        />
                                  </FormControl>
                                  

                                  :

                                  <FormControl variant="outlined" className={classes.root}>
                                     <InputLabel
                                          ref={ref => {
                                          this.InputLabelRef = ref;
                                          }}
                                          htmlFor="outlined-age-simple"
                                        >Item
                                         </InputLabel>
                                        <Select
                                          value={this.state.Item}
                                          onChange={this.handleChange}
                                          input={
                                        <OutlinedInput
                                          labelWidth={this.state.labelWidth}
                                          name="Item"
                                          id="outlined-age-simple"
                                        />
                                        }
                                        >




                                        {this.state.Condition === "Delete" ? 
                                              this.state.selected.map((option,index)=>{
                                                 
                                                    return  (

                                                    <MenuItem key={"menuitem" + index} value={option}>{option}</MenuItem>)

                                                    })

                                               :

                                                    this["state"][this.state.addSelection].map((option,index)=>{

                                                    return  (

                                                    <MenuItem key={"menuitem" + index} value={option}>{option}</MenuItem>)

                                                    })
                                            }


                                    </Select>
                                    </FormControl>

                      }





            </Grid>






            {/*  Render add/delete button depending on choices */}
         
            <Grid item xs={12} sm={3}>

            { this.state.Condition === "Add" &&

                  <Button onClick={this.addOrDelete} variant="outlined" size="large" className={classes.but} >
                  ADD
                  </Button>

            }


            {  this.state.Condition === "Delete" &&

             <Button onClick={this.addOrDelete } variant="outlined" size="large" className={classes.but} >
                  DELETE
                  </Button>}

             {  this.state.Condition === "Error" &&

             <p className={classes.text} >We have never heard of that item? <br/> Check back soon and if it is a real food <br/> we will add it</p>}
            </Grid>

        </Grid>


    </div>


       





            );
        }
}

   
  
 

   export default withStyles(styles)(ItemAdder)   



 ;
