
import axios from "axios";
import App from './App';
var ENDPOINT= process.env.URL_ENDPOINT;

//Possibly not needed but would be nice to have all db calls in one file and able to import into seperate files


//Item adder

   export const getFoodDataFromDb = () =>  {
        fetch(ENDPOINT + "/api/getData")
          .then(data => data.json())
          .then(res => this.setState({ options: res.data[0].options,
                                       cuisines: res.data[0].cuisines, 
                                       flavors: res.data[0].flavors,
                                       types: res.data[0].types}));
      }


   export const addFoodItemToDb = (ID, food, selection)=>{

     axios.post(ENDPOINT + "/api/addUnknownItemToFoods/", {
        id: ID,
        update: food,
        category:selection
      })
        .then(res => console.log(res))
        .then(this.getUserInfo(this.state.user._id))

    }


   export const getUserInfo = (user)=>{

     fetch(ENDPOINT + "/api/getUserInfo/" + user)
          .then(data => data.json())
          .then(res => this.setState({ user:res.data}))
          .then(this.checkOptions(this.state.Type));
    }


   export const deleteItemFromUser =(ID, food, selection)=>{

      
      axios.post(ENDPOINT + "/api/removefromUser",{
          id: ID,
          update: food,
          category:selection
        })
          .then(res => console.log(res))
       .then(this.getUserInfo(this.state.user._id))
    }

    export const addNewItemtoFoods = (food)=>{
      
       axios.post(ENDPOINT + "/api/addUnknownItemToFoods/" + food)
        .then(res => console.log(res))

    }