import React from 'react';
import { withStyles } from '@material-ui/styles';
import LongMenu from './LongMenu';
import auth0Client from '../Auth';
import { withRouter} from 'react-router-dom';
import compose from 'recompose/compose'
import Button from '@material-ui/core/Button';
import pan from '../img/pan.png'







const styles = {};

function NavBar(props) {

    const signOut = () => {
    auth0Client.signOut();
    props.history.replace('/');
  };

  return (

      <div className="navbar-fixed ">
        <nav className="amber lighten-4" role="navigation">
    <div className=" ">
    
     
      <a id="logo-container" href="/" className=" brand-logo black-text padd"> <img src={pan} alt="pan" height='30'></img> Chefistant</a>
      <ul className="right hide-on-med-and-down">
          <li>   {
        !auth0Client.isAuthenticated() &&
        <Button className="" onClick={auth0Client.signIn}>Sign In</Button>
      }
      {
        auth0Client.isAuthenticated() &&
        <div>
          <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
          <Button className="" onClick={() => {signOut()}}>Sign Out</Button>
        </div>
      }</li>
        <li><LongMenu /></li>
      </ul>
     
       <ul className="right hide-on-med-and-up show-on-medium" id="nav-mobile" >
        
      
         <li><LongMenu /></li>
       </ul>
      
    </div>
  </nav>
  </div>








  );
}




export default compose(
  withStyles(styles),
  withRouter,
)(NavBar);