import React from 'react';
import SingleLineGridList from './InterfaceComponents/RecipeList';
import MealPlan from './InterfaceComponents/MealPlan';
import GroceryList from './InterfaceComponents/GroceryList';
import SmallNav from'./InterfaceComponents/SmallNav';
import moment from 'moment';
import { withStyles } from '@material-ui/styles';
import ItemAdder from './InterfaceComponents/ItemAdder' 
import auth0Client from './Auth';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'
var ENDPOINT= 'https://api.chefistant.com';





const styles = {
  root:{

    marginTop: '0.5%',
    marginBottom:'1.5%',
    width:'100%',
    backgroudColor:'black',
    height:0,
  },
  mealPlan:{
    height:'auto',


  },
  cont:{
    flexGrow: 1,
    paddingTop:"1%",
    height: 'auto',
    paddingBottom:"5%",
    backgroundColor:"#FFFBED",
     borderTopStyle: 'solid' ,
    borderTopWidth:'0.5px',
    borderTopColor:'black',
},
  groceryList:{

    height:'70%',
    overflow:'scroll'
  },
  groceryListNav:{
    height:0
  },
  club:{
    backgroundColor:'white',
    
  },
    placeHolder:{
    backgroundColor:'white',
    minHeight:'100%',
    width:'100%',
    height:'75vh',
    alignContent:'center'
    
    
  },
  image:{

    display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '40%'
  },
  high:{
    height:'85%'
    
  }

    
};












  


//------------------------------------Find week by week id----------------------------------
        //Get the current week, previous week amd next week dates
           //If the user clicks back or forward move the dates in the respective way by a one week interval


     //Get current week 
   function setWeek(timeFormat){

    if(dateSetter === 0){
       return moment().startOf('week').format(timeFormat)}

          else if(dateSetter < 0){

             return moment().startOf('week').subtract('days', Math.abs(dateSetter)).format(timeFormat)}

          else {
               
              return moment().startOf('week').add('days', dateSetter).format(timeFormat)}
   }



      //Get last week
   function setLastWeek(timeFormat){

    if(dateSetter == 0){
       return moment().startOf('week').subtract('days', 7).format(timeFormat)}

          else if(dateSetter < 0){
                     return moment().startOf('week').subtract('days', (Math.abs(dateSetter) + 7)).format(timeFormat)
             }

          else {
               
              return moment().startOf('week').add('days', (dateSetter - 7)).format(timeFormat)}
   }




       //Get next week
   function setNextWeek(timeFormat){

      if(dateSetter == 0){
      return moment().startOf('week').add('days', 7).format(timeFormat)}

          else if(dateSetter < 0){

             return moment().startOf('week').subtract('days', Math.abs(dateSetter) - 7).format(timeFormat)}

          else {
               
              return moment().startOf('week').add('days', dateSetter + 7).format(timeFormat)}
   }







 //Keep track of where we are from current date
var dateSetter =0;

//-------------------------------------------------------------------------------------------------------------------







 class Interface extends React.Component {
  


   constructor(props){
    super(props);
  
  
    this.state ={
         
                userId:null,
                weeks:[<i className="material-icons ">keyboard_arrow_left</i>,setLastWeek('DD-MM'), setWeek('DD-MM'), setNextWeek('DD-MM'),<i className="material-icons  ">keyboard_arrow_right</i>],   
                foodTypes:["Dairy","Meat","Vegetables","Legumes","Wheat"],
                mealName:'Meal Plan',
                groceryName:'Grocery List',
                currentWeekGroceries:null,
                thisWeek:setWeek('DDMMYYYY')
                 
                }


        this.incrementDate =this.incrementDate.bind(this)

        this.decrementDate =this.decrementDate.bind(this)
    
        this.getWeekData=this.getWeekData.bind(this)

        this.getWeekMeal=this.getWeekMeal.bind(this)

        this.addWeekToUser=this.addWeekToUser.bind(this)
    }

 




       //When button is hit on child (smallNav) increment by one week and set state
   incrementDate(){

    dateSetter += 7
  
    this.setState({
      weeks:[<i class="material-icons ">keyboard_arrow_left</i>,setLastWeek('DD-MM'), setWeek('DD-MM'), setNextWeek('DD-MM'),<i className="material-icons  ">keyboard_arrow_right</i>]
      
      })
    }


       //When button is hit on child (smallNav) decrement by one week and set state
    decrementDate(){

     dateSetter -= 7;

      this.setState({

       weeks:[<i class="material-icons ">keyboard_arrow_left</i>,setLastWeek('DD-MM'), setWeek('DD-MM'), setNextWeek('DD-MM'),<i className="material-icons  ">keyboard_arrow_right</i>]
      })
    }











 //---------------------------Send Appropriate data to MealPlan / GroceryList / Your Recipes-------------------------


getWeekData(value){

switch(value){

case 1:
  
var weekId=setLastWeek('DDMMYYYY')

this.getWeekMeal(weekId)
break;

case 2:

var weekId=setWeek('DDMMYYYY')

this.getWeekMeal(weekId)
break;

case 3:

var weekId=setNextWeek('DDMMYYYY')
this.getWeekMeal(weekId)


break;

}

}


getUserInfo(){

 fetch(ENDPOINT + "/api/getUserInfo")
      .then(data => data.json())
      .then(res => console.log(res));
}



getWeekMeal(weekId){
console.log(ENDPOINT + "/api/getWeekMeal/" + weekId + "/" + this.props.userId)
fetch(ENDPOINT + "/api/getWeekMeal/" + weekId + "/" + this.props.userId )
    .then(data => data.json())
      .then(res => {
        var newData =res.data && res.data.weeks[0].weeksRecipes
      
      this.setState({

        currentWeekGroceries:newData

      })})
}


putDbUser(userData){

axios.post(ENDPOINT + "/api/putUserData",{data:userData})

}



  addWeekToUser(idToUpdate, updateToApply){
  

    axios.post(ENDPOINT + "/api/addWeekToUser", {
      id: idToUpdate,
      update: updateToApply 
    });


  };





//-------------------------------------------------------------------------------------------------------------------






componentWillReceiveProps(nextProps){
this.setState({userId:nextProps.userId})
this.getWeekMeal(this.state.thisWeek)

}




componentWillMount(){
    this.getWeekMeal(this.state.thisWeek)

}

componentDidMount(){
    this.getWeekMeal(this.state.thisWeek)
    
}




  render() {
     const { classes } = this.props;
     const {currentWeekGroceries } =this.state




    return(

       
      
      <div>
        

   
    <Grid container>
        <Grid className={classes.club} item xs={12}>
         
         <ItemAdder userId= {this.state.userId}/>

        
    </Grid>
                              
                            {currentWeekGroceries ?
                                <Grid container>

                                  <Grid item  xs={12}>
                                      <div className="col s12">
                                          <SingleLineGridList list={this.state.currentWeekGroceries} />
                                      </div>
                                 </Grid>
                                

                                 
                                <Grid container className={classes.cont}   alignContent="space-around" justify="space-evenly">
                                
                                        <Grid item xs={5}  >
                                           
                                               
                                                  <SmallNav inc={this.incrementDate} dec={this.decrementDate} week={this.getWeekData} name={this.state.mealName} renderTabs={this.state.weeks} />
                                           
                                           

                                            <Grid item xs={12}>
                                                
                                                <MealPlan currentWeekGroceries={this.state.currentWeekGroceries}/>
                                                
                                            </Grid>
                                       </Grid>
                                    

                                         
                                     

                                       <Grid item xs={5} >
                                           
                                         
                                                <SmallNav  myClass='groceryListNav' name={this.state.groceryName} renderTabs={this.state.foodTypes} />
                                         
                                          
                                          <Grid item xs={12} className={classes.high}>

                                            <GroceryList  currentWeekGroceries={this.state.currentWeekGroceries}/> 


                                          </Grid>

                                      </Grid>
                                  </Grid>
          </Grid>
     : <div className={classes.placeHolder}>
       <img src={require("./img/meal.gif")} className={classes.image}  alt="oh shit"  />
     <Typography align="center" variant="h3" component="h2" gutterBottom>
        You havent planned this week yet
      </Typography>

        <Link className={classes.root} to={"/planyourweek" + this.state.thisWeek}>
            
          
      <Typography align="center" variant="h5" component="h2" gutterBottom>
        PLAN NOW
      </Typography>
       </Link>
     </div>}
           
          </Grid>

      </div> 
       
   
    );
  }
}



export default withStyles(styles)(Interface);