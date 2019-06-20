

import auth0 from 'auth0-js';

var REDIRECTURI=process.env.REACT_APP_REDIRECTURI;




class Auth {
  constructor() {


    this.auth0 = new auth0.WebAuth({
      
      domain: 'abellinii.au.auth0.com',
      audience: 'https://abellinii.au.auth0.com/userinfo',
      clientID: 'K0mowQGaScTM4gThu3hNiYFrv1mlKzd0',
      redirectUri: 'https://www.chefistant.com/#callback',
      responseType: 'id_token',
      scope: 'openid profile',
    });





    this.getProfile = this.getProfile.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  getProfile() {
    
    return this.profile;
  }

  getIdToken() {
    return this.idToken;
  }

  getID(){
    return this.profile && this.profile.sub;
  }


  isAuthenticated() {
    return new Date().getTime() < this.expiresAt;
  }

  signIn() {
    this.auth0.authorize({audience: 'https://abellinii.au.auth0.com/userinfo',
      redirectUri: 'https://www.chefistant.com/#callback',
      clientID: 'K0mowQGaScTM4gThu3hNiYFrv1mlKzd0',
      responseType: 'id_token',
      scope: 'openid profile'});

  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return reject(err);
        if (!authResult || !authResult.idToken) {
          return reject(err);
        }
        
        // set the time that the id token will expire at
      
        this.setSession(authResult);
        
        resolve();
      });
    })
  }

    setSession(authResult) {
    this.idToken = authResult.idToken;
    this.profile = authResult.idTokenPayload;
    this.result = authResult
    // set the time that the id token will expire at
    this.expiresAt = authResult.idTokenPayload.exp * 1000;
  }

    silentAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.checkSession({}, (err, authResult) => {
        if (err) return reject(err);
        this.setSession(authResult);
        resolve();
      });
    });
  }






  signOut() {
     this.auth0.logout({
      returnTo: 'https://www.chefistant.com#',
      clientID: 'K0mowQGaScTM4gThu3hNiYFrv1mlKzd0',
    });
    // clear id token, profile, and expiration
    this.idToken = null;
    this.profile = null;
   
  }
}

const auth0Client = new Auth();



export default auth0Client;