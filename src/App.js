
import React from "react";
import NavBar from './components/navBar';
import Footer from './components/Footer';
import Home from './Home';
import Login from './Login';
import Checkout from './Checkout';
import Interface from './Interface';
import WeekPlanner from './WeekPlanner';
import Callback from './Callback/Callback'
import axios from "axios";
import auth0Client from './Auth';
import { withRouter, Route } from "react-router-dom";
var ENDPOINT= process.env.REACT_APP_URL_ENDPOINT








console.log(ENDPOINT);
class App extends React.Component{
  // initialize our state 


   constructor(props){
    super(props);
  this.state = {
    userSignedIn:auth0Client.isAuthenticated() ,
    data: [],
    food:null,
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    userId:null,
    newUser:null
  };
this.getUserInfo =this.getUserInfo.bind(this)
this.getFoodDataFromDb = this.getFoodDataFromDb.bind(this)
}


//When data mounts if session is still in use silently authenticate
  //set the state of userId if a user is logged in or logs in
    //Check if there is a log in and send user id to getUserInfo function to determine new user
  async componentWillMount() {

      var result;
    
    
    try {
      await auth0Client.silentAuth().then(()=>{
          result = auth0Client.getID();
          console.log(result)
      })
           
      this.forceUpdate();
      this.setState({
        userId:result
      })
      console.log(this.state.userId)
     this.getUserInfo(this.state.userId)

    } catch (err) {
      result = auth0Client.getID() ;
      console.log("nouser")
     
      this.setState({
        userId:result
      })

      this.getUserInfo(this.state.userId)
    }
  }




  getFoodDataFromDb = () =>  {
    fetch(ENDPOINT + "/api/getData")
      .then(data => data.json())
      .then((res) => {this.setState({ food: res.data[0].options })
        console.log(res)
        return res
        });

  };



//Used to check if a user is new and render appropriate page after login
    getUserInfo(user){
      if(user === null || user === undefined){
        return false
      }else{

       fetch(ENDPOINT + "/api/getUserInfo/" + user)
            .then(data => data.json())
            .then((res) => {
            if(res.data){
              //If data found not a new user
              this.setState({
                newUser:false
              })

            }else{
              //If no data user is new 
              this.setState({
                newUser:true
            })}
          
      })

          }
          }



  // our delete method that uses our backend api 
  // to remove existing database information
  deleteFromDB = idTodelete =>{
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete(ENDPOINT + "/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };


  // our update method that uses our backend api
  // to overwrite existing data base information
  updateUser = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post(ENDPOINT + "/api/updateData", {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
  };





  // here is our UI
  // it is easy to understand their functions when you 
  // see them render into our screen

  render() {
  



    return (
      
           
                 
                  <div>
               
                   
                         <div>  
                            <NavBar />
                          </div>
                              
                        <main>  
                         <Route exact path="/" 
                           render={({ match }) => { return this.state.newUser   ?  <Checkout id={this.state.userId}/> :  <Home/>}}/> 
                         <Route path="/login" component={Login} />
                         <Route path="/interface" render={(props)=> <Interface {...props} />} />
                         <Route path="/planyourweek:date?/" component={WeekPlanner} />
                         <Route exact path='/callback' component={Callback}/>
                        </main>
                  
                         <div >
                           <Footer />
                         </div>


                 </div>
       
        
    );
  }
}

export default withRouter(App);