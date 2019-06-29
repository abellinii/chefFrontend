import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import AlertDialogSlide from './WeekPlannerComponents/AlertDialog' 
import auth0Client from './Auth';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import DatePickers from './WeekPlannerComponents/DatePickers';
import ApiRecipes from './WeekPlannerComponents/ApiRecipes';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import WeekTracker from './WeekPlannerComponents/WeekTracker';
import ChosenRecipes from './WeekPlannerComponents/ChosenRecipes';
import { getRecipes } from './userDataParsing';
import { WEEK, MEAL } from './userDataParsing';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
import Hidden from '@material-ui/core/Hidden';


var ENDPOINT= 'https://api.chefistant.com';



const styles = {
  root:{
      width:'100vw',
      backgroudColor:'black',
      overflow:"hidden"
  },
  title:{
      textAlign:'center',
      backgroundColor:'#fef9e6'
  },  
  topMarge:{ 
    marginTop:"0.5%",
      display:'inline-block',
      width:"100vw",
      height:'100%'
  }, 
    topMargeItem:{ 
    marginTop:"0.5%",
    marginLeft:"3%",
      display:'inline-block',
      width:"100vw",
      height:'100%'
  }, 
  marge:{
    textAlign:'center',
    alignContent:'center',
      display:"inline-block",
      marginLeft:"3%",
      marginRight:"1%",
      marginTop:'1%',
      width:"100%",
      height:'100%'
  },
    recipes:{
      textAlign:'center',
      alignContent:'center',
      display:"inline-block",
      marginTop:'1%',
      width:"100%",
      height:'100%'
  },
  ask:{paddingLeft:'3%',
      fontSize:'1.2rem'},
      but:{
      height:'100%',
      color:'black',
      cursor:'pointer',
      paddingLeft:'3%',
      marginTop:'2%',
  },
   chip: {
      margin: '0.5%',
  },
buttons:{
      justifyContent: 'space-evenly',
      alignContent: 'space-evenly',
      paddingLeft:'10%',
      paddingRight:'10%',
      width:'95%',
      marginTop:'5%',
      marginBottom:'5%',
},
alert:{    
     float:'right'     
},
selectWidth:{
  width:"100%"
},
main:{
  borderTop:"1px solid black",
   borderBottom:"1px solid black"
},
chosenRecipes:{
  borderLeft:"1px solid black",
  width:'99%',
  backgroundColor:'white'
}

};










 class WeekPlanner extends React.Component {
  


   constructor(props){
    super(props);
  
    this.state = {         
          user:'',
          currentWeekGroceries:null,
          planArray:[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],
          foodsOfTheWeek:[],
          unlikedFoodsOfTheWeek:[], 
          cuisines:[],
          types:[], 
          Type:"Select..." ,
          selectedUnlikedFood:"",
          selectedFood:"",
          foodData: [],
          unlikedFoodData: [],
          checkedB:true,
          checkedL:true,
          checkedD:true,
          selectedWeek:this.props.match.params.date,
          showApiRecipes:false,
          recipesCalled:"",
          offset:0,
          userId:null,
          data:'',
          labelWidth:1
      }


        
    this.setRecipePicked = this.setRecipePicked.bind(this)
    this.getWeekMeal = this.getWeekMeal.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)
    this.getFoodDataFromDb = this.getFoodDataFromDb.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeCheck = this.handleChangeCheck.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.getRecipes = this.getRecipes.bind(this)
    this.showRecipes = this.showRecipes.bind(this)
    this.getMoreRecipes = this.getMoreRecipes.bind(this)
    this.addRecipeToWeek = this.addRecipeToWeek.bind(this)
    this.setWeekTracker = this.setWeekTracker.bind(this)
}









      getUserInfo(user){
          fetch(ENDPOINT + "/api/getUserinfo/" + user)
            .then(data => data.json())
            .then((res) => {
              this.setState({ user:res.data})})
          
      }






      addWeekToUser(idToUpdate, date){

      //Add an empty week to user with the date of the week. If user has no default then set one with date "00000000"
      var update = {
            "weekID": date,
            "weeksRecipes": {
                "Monday": {
                    "Breakfast": {
                        "title": "No recipe chosen",
                        "ingredients": [],
                        "method": [],
                        "picture": "knf.jpg"
                    },
                    "Lunch": {
                        "title": "No recipe chosen",
                        "ingredients": [],
                        "method": [],
                        "picture": "knf.jpg"
                    },
                    "Dinner": {
                        "title": "No recipe chosen ",
                        "ingredients": [],
                        "method": [],
                        "picture": "knf.jpg"
                    }
                },
                "Tuesday": {
                    "Breakfast": {
                        "title": "No recipe chosen",
                        "ingredients": [],
                        "method": [],
                        "picture": "knf.jpg"
                    },
                    "Lunch": {
                        "title": "No recipe chosen",
                        "ingredients": [],
                        "method": [],
                        "picture": "knf.jpg"
                    },
                    "Dinner": {
                        "title": "No recipe chosen ",
                        "ingredients": [],
                        "method": [],
                        "picture": "knf.jpg"
                    }
                },
                "Wednesday": {
                    "Breakfast": {
                        "title": "No recipe chosen",
                        "ingredients": [],
                        "method": [ ],
                        "picture": "knf.jpg"
                    },
                    "Lunch": {
                        "title": "No recipe chosen",
                        "ingredients": [],
                        "method": [],
                        "picture": "knf.jpg"
                    },
                    "Dinner": {
                        "title": "No recipe chosen ",
                        "ingredients": [],
                        "method": [],
                        "picture": "knf.jpg"
                    }
                },
                "Thursday": {
                    "Breakfast": {
                        "title": "No recipe chosen",
                        "ingredients": [],
                        "method": [],
                        "picture": "knf.jpg"
                    },
                    "Lunch": {
                        "title": "No recipe chosen",
                        "ingredients": [],
                        "method": [],
                        "picture": "knf.jpg"
                    },
                    "Dinner": {
                        "title": "No recipe chosen ",
                        "ingredients": [],
                        "method": [],
                        "picture": "knf.jpg"
                    }
                },
                "Friday": {
                    "Breakfast": {
                        "title": "No recipe chosen",
                        "ingredients": [],
                        "method": [],
                        "picture": "knf.jpg"
                    },
                    "Lunch": {
                        "title": "No recipe chosen",
                        "ingredients": [],
                        "method": [],
                        "picture": "knf.jpg"
                    },
                    "Dinner": {
                        "title": "No recipe chosen ",
                        "ingredients": [],
                        "method": [],
                        "picture": "knf.jpg"
                    }
                },
                "Saturday": {
                    "Breakfast": {
                        "title": "No recipe chosen",
                        "ingredients": [],
                        "method": [],
                        "picture": "knf.jpg"
                    },
                    "Lunch": {
                        "title": "No recipe chosen",
                        "ingredients": [],
                        "method": [],
                        "picture": "knf.jpg"
                    },
                    "Dinner": {
                        "title": "No recipe chosen ",
                        "ingredients": [],
                        "method": [],
                        "picture": "knf.jpg"
                    }
                },
                "Sunday": {
                    "Breakfast": {
                        "title": "No recipe chosen",
                        "ingredients": [],
                        "method": [],
                        "picture": "knf.jpg"
                    },
                    "Lunch": {
                        "title": "No recipe chosen",
                        "ingredients": [],
                        "method": [],
                        "picture": "knf.jpg"
                    },
                    "Dinner": {
                        "title": "No recipe chosen ",
                        "ingredients": [],
                        "method": [],
                        "picture": "knf.jpg"
                    }
                }
            }
        }


  
    //Call add user with info
    axios.post(ENDPOINT + "/api/addWeekToUser", {
      id: idToUpdate,
      update: update 
    });
  };





    getWeekMeal(date){
          console.log(ENDPOINT + "/api/getWeekMeal/" + date + "/" + this.props.userId);
          //Check if date is supplied
          if(date === undefined){
          date = "00000000"
          }
          //Call API and grab week
          if(this.state.userId != null){
          fetch(ENDPOINT + "/api/getWeekMeal/" + date + "/" + this.props.userId)
          .then(data => data.json())
          .then(res => {
                  //If data is there extract with getRecipe and store in state(currentWeekGroceries)
                  console.log(res)
                  if(res.data){
                      var newData =  res.data && res.data.weeks[0].weeksRecipes
                      console.log(newData)
                      this.setWeekTracker(newData);
                      
                      this.setState({
                      currentWeekGroceries:getRecipes(newData)
                      })
                  //If not add another week to user with supplied date
                  }else{
                      this.addWeekToUser(this.state.userId,date)
                        
                  }
          })
        }
    }

  





     setWeekTracker (input) {
      var list=[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
       //Break Object from keys
       var days = Object.entries(input)
         //Iterate through each day
         for (var [day,meal] of days){
          //Break meals from days 
          var today = day;
          var recipe = Object.entries(meal)
            //Iterate through meals 
              
            for (var [time,entrie] of recipe){
               //Map through recipe ingredients
              //Add binary bool to the list
              
               if (entrie.ingredients.length !== 0){
                  var one = WEEK[today];
                  var two = MEAL[time]
                 list[one][two]=1
               }
          }
       }
       //set list to planArray with the meals that already been planned
      this.setState({
        planArray:list
      })


      }





    getFoodDataFromDb = () =>  {
        fetch(ENDPOINT + "/api/getData")
          .then(data => data.json())
          .then(res => { 
            this.setState({ 
                   cuisines: res.data[0].cuisines, 
                   types: res.data[0].types})});
      }








addRecipeToWeek(day, meal, title, ingredients, instructions, pic){
//Make recipe object to insert
var recipe = {
              "title": title,
              "ingredients": ingredients,
              "method": instructions,
              "picture": pic
          }
//Insert recipe into users recipes
 axios.post(ENDPOINT + "/api/addRecipeToWeek", {
      day: day,
      meal: meal,
      recipe:recipe,
      week:this.state.selectedWeek,
      id: this.state.userId
    }).then(()=>{
    this.getWeekMeal(this.state.selectedWeek)}) 
}







//using enum set the meal that has been provided a recipe to 1 
setRecipePicked(day,meal){
  let one = WEEK[day];
  let two = MEAL[meal]
  console.log("setPicked")
  let arr = [...this.state.planArray]
  arr[one][two] = (arr[one][two] === 0) ? 1 : 0
  this.setState({
        planArray: arr
  })

}






 handleChangeCheck = name =>event => {
      this.setState({ [name]: this["state"][name] === true ? false : true});
  }



  handleChange = event => {
       this.setState({ [event.target.name]: event.target.value }); 
  };








  //-----------------------------------------API CALLS-------------------------------------------------
  getRecipes( ){

      //Check the data is there for each of the items liked foods/unliked foods and dietary requirments
      let wantedFoods = this.state.foodData[0] ? this.state.foodData : "false";
      let unwantedFoods = this.state.unlikedFoodData[0] ? this.state.unlikedFoodData : "false";
      let diet = "false";
       
      //Construct url string to call API
      let getReq="https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?"
       + (diet === "false" ? "":"diet=" + diet)
        + (wantedFoods === "false"? "":"includeIngredients="
                                         +  wantedFoods.map((food,i )=>{ 
                                            if(i !== 0){
                                               return "%2C" + food.label
                                            }else{
                                              return food.label
                                            }})  + "&") 

         +   (unwantedFoods === "false"? "" : "excludeIngredients="  +  unwantedFoods.map((food, i)=>{ 
                                            if(i !== 0){
                                               return "%2C" + food.label
                                            }else{
                                              return food.label
                                            }})  + "&")                                                         //Provide offset if it is called again to get the next recipes
         + "instructionsRequired=true&addRecipeInformation=true&fillIngredients=true&limitLicense=true&offset=" + this.state.offset + "&number=10";

        //Provide header options for API call 
        const options = {
        
        headers: new Headers({"X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com", "X-RapidAPI-Key": "b36fcb5b17msh464722ca328f521p162db3jsn2af352763549"})
        
         };


  //Call API and give results recipes called 
  fetch(getReq,options).then(res=> 
  res.json()).then((res)=>{
  this.setState({recipesCalled:res.results,
                  showApiRecipes:true})



})
 //Update meals for the week 
 this.getWeekMeal(this.state.selectedWeek)

  }




  
//Check event and add new unliked food or liked food to appropriate array
 clickIt (event) {
  if(event === 1){

    let arr = this.state.foodData
    if(this.state.foodData.filter(e => (e.label === this.state.selectedFood)).length < 1){
     arr.push({key:this.state.foodData.length > 1 ? this.state.foodData.length + 1 : 0, label:this.state.selectedFood })
     this.setState({ foodData: arr});}
  }else{

    let arr = this.state.unlikedFoodData
    if(this.state.unlikedFoodData.filter(e => (e.label === this.state.selectedUnlikedFood)).length <1){
     arr.push({key:this.state.unlikedFoodData.length > 1 ? this.state.unlikedFoodData.length + 1 : 0, label:this.state.selectedUnlikedFood })
     this.setState({unlikedFoodsData: arr});}
  }
    
  };





  //On first API call get recipes
  showRecipes(){
    this.getRecipes();
    this.setState({
      offset:0,
    })
  }

  //If the user wants more recipes call the next 10
  getMoreRecipes(){
    this.getRecipes();
    let num = this.state.offset + 10;
    this.setState({
      offset:num
    })
  }



  //When a chip for liked or unliked food  is clicked to delete remove it
  handleDelete = (type,data) => () => {
 
  if(type === "food"){
    this.setState(state => {
      const foodData = [...state.foodData];
      const chipToDelete = foodData.indexOf(data);
      foodData.splice(chipToDelete, 1);
      return { foodData };
    });}else{
       this.setState(state => {
      const unlikedFoodData = [...state.unlikedFoodData];
      const chipToDelete = unlikedFoodData.indexOf(data);
      unlikedFoodData.splice(chipToDelete, 1);
      return { unlikedFoodData};
    });
    }
  };



    //Get the start of week date when datePicker is changed
    handleDateChange = event => {
      console.log(event)
    var newDate = moment(event).startOf('week').format('DDMMYYYY')
   
    this.setState({ selectedWeek: newDate
    });
    
  };
  
 

    componentWillMount(){
    
    

     if(this.props.match.params.date){
      this.setState({
        selectedWeek:this.props.match.params.date,
        userId:nextProps.userId
      })
     }
      console.log("mounting")
      this.getFoodDataFromDb();
      this.getWeekMeal(this.state.selectedWeek);
      
    }

   componentDidMount(){
    this.setState({userId:nextProps.userId})
    if(this.props.match.params.date){
      this.setState({
        selectedWeek:this.props.match.params.date,
        userId:nextProps.userId
      })
     }
     console.log("mounted")
      this.getFoodDataFromDb();
      this.getWeekMeal(this.state.selectedWeek);
}


    componentWillReceiveProps(nextProps){
      console.log("getting new props")
    this.setState({userId:nextProps.userId})
    this.getWeekMeal(this.state.selectedWeek)

    }



  render() {

     const { classes } = this.props;
     const {currentWeekGroceries } =this.state;




    return(
      <div className={classes.root}>
      <Grid container >

         {/*Title*/}
      <Grid item xs={12} className={classes.title}>
          
           <h1>  Plan a week </h1>  

      </Grid>


      <Grid className={classes.marge}item  xs={12}>
           <Divider/>
      </Grid>  
         

         {/*DatepicKer and meal checklist*/}
      <Grid container className="topMargeXS">

      <Grid className="topMargeXS" item  xs={6} md={3}>

                            <DatePickers className="datePicker" handleDateChange={this.handleDateChange} selectedWeek={this.state.selectedWeek} />             
      
      </Grid>





     
 <Grid container xs={12} md={9} className="topMargeXS" >

      <Grid className={classes.topMarge}item  xs={4}>

             <p>Breakfast</p>        <Checkbox
          checked={this.state.checkedB}
          onClick={this.handleChangeCheck('checkedB')}
          value="checkedB"
          color="primary"
        />
 

      </Grid>


      <Grid className={classes.topMarge}item  xs={4}>

              <p>Lunch</p>         <Checkbox
          checked={this.state.checkedL}
          onClick={this.handleChangeCheck('checkedL')}
          value="checkedL"
          color="primary"
        />
 

      </Grid>


      <Grid className={classes.topMarge}item  xs={4}>

              <p>Dinner</p>        <Checkbox
          checked={this.state.checkedD}
          onClick={this.handleChangeCheck('checkedD')}
          value="checkedD"
          color="primary"
        />
 
      </Grid>

      </Grid>
      </Grid>

      <Grid className={classes.marge}item  xs={12}>
              <Divider/>
      </Grid>           








        {/*What do you feel like*/}
           <Grid className={classes.topMarge} spacing={16} container  >

                            <Grid className={classes.topMarge}item  xs={12} md={3}>
                            <FormControl variant="outlined" className={classes.root}>
                            <p className={classes.ask}>Do You feel like any foods?</p>    
                             </FormControl>
                            </Grid>  
                            <Grid className={classes.topMargeItem}item  xs={6} md={2}>
                            <FormControl variant="outlined" className={classes.selectWidth}>
                            <InputLabel
                            ref={ref => {
                            this.InputLabelRef = ref;
                            }}
                            htmlFor="outlined-age-simple"
                            >
                            Item
                            </InputLabel>  
                            <Select
                            value={this.state.selectedFood}
                            onChange={this.handleChange}
                            input={
                            <OutlinedInput
                            labelWidth= {this.state.labelWidth}
                            name="selectedFood"
                            id="outlined-age-simple"
                            />}>
                                    {this.state.types.map((option,index)=>{
                                    return  (

                                    <MenuItem key={"menuitem" + index} value={option}>{option}</MenuItem>)

                                    }
                                    )}

                            </Select>
                            </FormControl>
                            </Grid>
                            <Grid className={classes.marge}item  xs={4} md={1}>
                            <FormControl variant="outlined" className={classes.but} >
                            <Button onClick={()=>this.clickIt(1)} value="Food" variant="outlined" size="large"  >
                            ADD
                            </Button>
                             </FormControl>
                            </Grid>
                             
                             <Grid className={classes.marge} item xs={12} md={5}>
                             <FormControl variant="outlined" className={classes.marge} >
                             
                               {this.state.foodData.map((data)=>{
                                    return  (

                                      <Chip
                                        key={data.key}
                                        label={data.label}
                                        onDelete={this.handleDelete("food",data)}
                                        className={classes.chip}
                                      />)

                                    }
                                    )}
                               
                               </FormControl>
                             </Grid>
                             
         </Grid>


          {/*What dont you feel like*/}
          <Grid className={classes.marge}item  xs={12}>
                 <Divider/>
          </Grid>   


        

                            <Grid className={classes.topMarge}container  spacing={16} >
                            <Grid className={classes.topMarge}item xs={12} md={3}>
                             <FormControl variant="outlined" className={classes.root}>
                            <p className={classes.ask} >Or are there any foods you do not feel like?</p> 
                            </FormControl>    
                            </Grid>
                            <Grid className={classes.topMargeItem}item  xs={6} md={2}>
                            <FormControl variant="outlined" className={classes.selectWidth}>
                            <InputLabel
                            ref={ref => {
                            this.InputLabelRef = ref;
                            }}
                            htmlFor="outlined-age-simple"
                            >
                            Item
                            </InputLabel>  
                            <Select
                            value={this.state.selectedUnlikedFood}
                            onChange={this.handleChange}
                            input={
                            <OutlinedInput
                            labelWidth= {this.state.labelWidth}
                            name="selectedUnlikedFood"
                            id="outlined-age-simple"
                            />}>
                                    {this.state.types.map((option,index)=>{
                                    return  (

                                    <MenuItem key={"menuitem" + index} value={option}>{option}</MenuItem>)

                                    }
                                    )}
                            </Select>
                            </FormControl>
                            </Grid>
                            <Grid className={classes.marge} item  xs={4} md={1}>
                             <FormControl variant="outlined" className={classes.but} >
                            <Button onClick={this.clickIt.bind(this)} variant="outlined" size="large"  >
                            ADD
                            </Button>
                            </FormControl>
                            </Grid>
                              <Grid className={classes.marge} item xs={12} md={5}>
                             <FormControl variant="outlined" className={classes.marge} >
                                {this.state.unlikedFoodData.map((data)=>{
                                    return  (

                                  <Chip
                                        key={data.key}
                                        label={data.label}
                                        onDelete={this.handleDelete("cuisine",data)}
                                        className={classes.chip}
                                      />)

                                    }
                                    )}

                           
                             </FormControl>
                               </Grid>
            </Grid>




      
{this.state.recipesCalled !== "" &&

        <Grid className={classes.marge}item  xs={12}>
               <Divider/>
        </Grid>  }

{/*recipe picker*/}

        <Grid className={classes.recipes} container >
        





{/*Show buttons to get new recipes depending on stage in the process*/}

      
        
{!this.state.showApiRecipes ?
              <Grid className={classes.alert} item  xs={12}>
              <AlertDialogSlide {...this.state} title='GET RECIPES' getRecipes={this.showRecipes}/>
              </Grid>
: this.state.recipesCalled !== "" &&

              <Grid  className="recipes" item spacing={34} xs={12}>
              <Grid className="recipes" item  xs={12} md={11}>
              <ApiRecipes resetMeals={this.getWeekMeal} week={this.state.selectedWeek}addRecipe ={this.addRecipeToWeek}tileData ={this.state.recipesCalled} />
              </Grid>
              
             <Grid className="recipes" container  xs={12} md={1}>
             

               <AlertDialogSlide className="buttons" {...this.state} title='CHANGE OPTIONS' getRecipes={this.getRecipes}/>
              
              <Grid  className="alignsButs"  item  xs={6} md={12}>
            
                <Button  className="buttons" variant="outlined" color="primary" onClick={this.getMoreRecipes}>SHOW MORE</Button>
                
            </Grid>
              </Grid>              </Grid> 
                 
          
}

       
  </Grid>
        <Grid className={classes.marge}item  xs={12}>
                <Divider/>
        </Grid> 





     {/*main section*/}

      {currentWeekGroceries ?

        <Grid container className={classes.main} >
        
              <Grid item  xs={12} md={2}>
             <WeekTracker  planArray={this.state.planArray} handleChoice={this.setRecipePicked}/>
         
             </Grid>
            {this.state.selectedWeek === "" ?
            <Hidden smDown >
               <Grid item  className={classes.chosenRecipes}xs={0} md={10}>
                <img src={require("./img/meal.gif") }alt="gif" width='100%' />
               </Grid> 
               </Hidden>
         :
              <Hidden smDown >
              <Grid item  className={classes.chosenRecipes}xs={0} md={10}>
             <ChosenRecipes recipePrototype={this.state.currentWeekGroceries}/>
             </Grid>
            </Hidden> 
           }

        </Grid>  :   

                       <Grid container className={classes.main}  >
                       <Grid item  xs={12} md={2}>
                       <WeekTracker  planArray={this.state.planArray} handleChoice={this.setRecipePicked}/>
                       </Grid>
                       <Hidden smDown >
                       <Grid item  className={classes.chosenRecipes}xs={0} md={10}>
                      <img src={require("./img/meal.gif") }alt="gif" width='100%' />
                     </Grid> 
                      </Hidden>
                    </Grid> }

        
</Grid>
      </div> 
       
   
    );
  }
}




export default withStyles(styles)(WeekPlanner);