
 
import React, { Component } from 'react';
import bottom from './img/bottom.jpg';
import chef from './img/chef.jpg';
import color from './img/color.jpg';
import Button from '@material-ui/core/Button';
import auth0Client from './Auth';



export default class Home extends Component{


render(){



  return(
  <div>

  <div id="index-banner" className="parallax-container">
    <div className="section no-pad-bot">
  
      <div className="container">
       
        <h1 className="header-logo header center lime-text text-lighten-2">Chefistant</h1>
        <div className="row center">
          <h5 className="header col s12 light">Your personal Alexa Chef to assist you with meal choices, your grocery list and more.....</h5>
        </div>
        <div className="row center">
            {
              !auth0Client.isAuthenticated() && (
                  <Button
                    id="qsLoginBtn"
                    className="btn-large waves-effect waves-light  lime lighten-1"
                    onClick={auth0Client.signIn}
                  >
                    Get Started
                  </Button>
                )
            }
            {
              auth0Client.isAuthenticated() && (
                <form action="/interface">
                  <Button
                    id="qsLogoutBtn"
                    className="btn-large waves-effect waves-light  lime lighten-1"
                    type='submit'
                  >
                    Dashboard
                  </Button>
                  </form>
                )
            }
        </div>
     <div className="parallax"><img src={color}alt="Unsplashed background img 1"></img></div>
      </div>
    </div>
    
  </div>
  


  <div className="container">
    <div className="section">

     
      <div className="row">
        <div className="col s12 m4">
          <div className="icon-block">
            <h2 className="center brown-text"><i className="material-icons">hearing</i></h2>
            <h5 className="center">Voice assistant</h5>

            <p className="light">You own voice assisted personal chef to help prepare your meal plan with <a href="https://developer.amazon.com/alexa"> Amazon Alexa</a></p>
          </div>
        </div>

        <div className="col s12 m4">
          <div className="icon-block">
            <h2 className="center brown-text"><i className="material-icons">local_dining</i></h2>
            <h5 className="center">Meal planning</h5>

            <p className="light">Plan all your meals ahead of time suited to your tastes and dietary concerns </p>
          </div>
        </div>

        <div className="col s12 m4">
          <div className="icon-block">
            <h2 className="center brown-text"><i className="material-icons">mode_edit</i></h2>
            <h5 className="center">Grocery list</h5>

            <p className="light">Have it all prepared to a grocery list to make your shopping experience more convienient</p>
          </div>
        </div>
      </div>

    </div>
  </div>


  <div className="parallax-container valign-wrapper">
    <div className="section no-pad-bot">
      <div className="container">
        <div className="row center">
          <h5 className="header col s12 light">Imagine not having to worry about all the details leading to the kitchen ?</h5>
        </div>
      </div>
    </div>
    <div className="parallax"><img src={chef}alt="Unsplashed background img 2"></img></div>
  </div>

  <div className="container">
    <div className="section">

      <div className="row">
        <div className="col s12 center">
          <h3><i className="mdi-content-send brown-text"></i></h3>
          <h4>Contact Us</h4>
          <p className="left-align light">We are always trying to improve the user experience and make our service the best it can be. We are always open to suggestions. Let us know what you like, What you dont like and What features you would like to have. We want to have a world class chef in our home as well!</p>
        </div>
      </div>

    </div>
  </div>


  <div className="parallax-container valign-wrapper">
    <div className="section no-pad-bot">
      <div className="container">
        <div className="row center">
          <h5 className="header col s12 light">Focus only on what you love! Cooking</h5>
        </div>
      </div>
    </div>
    <div className="parallax"><img src={bottom}alt="Unsplashed background img 3"></img></div>
  </div>

</div>

)

    
}



}

	