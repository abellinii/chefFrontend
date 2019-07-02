import React from 'react';
import { withStyles }  from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './components/AddressForm';
import PaymentForm from './components/PaymentForm';
import Review from './components/Review';
import axios from "axios";
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
var ENDPOINT= 'https://api.chefistant.com'



const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: '23%',
    marginRight: '23%',
  },
  paper: {
    marginTop: '7%',
    marginBottom: '7%',
    padding: '5%',
  },
  stepper: {
    padding: `${200}px 0 ${200}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: '7%',
    marginLeft: '3.5%',
  },
  title:{
    fontFamily:'Arvo, serif'
  }
});


  







class Checkout extends React.Component {
 
   constructor(props) {
    super(props);

    this.state = {
    steps:['Personal Details', 'What you like/dislike? ', 'Review'],
    activeStep: 0,
    userName:"",
    userPassword:"",
    firstName:"",
    lastName:"",
    address1:"",
    city:"",
    state:"",
    zip:"",
    country:"",
    email:"",
    cuisineLikes:[],
    cuisineDislikes:[],
    foodLikes:[],
    foodDislikes:[],
    flavorLikes:[],
    flavorDislikes:[],
    input:"",
    foods:[]
  };

   this.getFoodDataFromDb = this.getFoodDataFromDb.bind(this)
   this.handleChange = this.handleChange.bind(this)
  
  }



     componentWillMount(){
     this.getFoodDataFromDb();

    }


    //Each phase of the new user questionare
     getStepContent(step) {
      switch (step) {
        case 0:
          return (<AddressForm
              handleChange={this.handleChange}
          {...this.state}
            />);
        case 1:

          return (<PaymentForm 
              handleChange={this.handleChangeLikes}
           {...this.state}
              />);
        case 2:
          return (<Review 
        {...this.state}
            handleChange={this.handleChange}
            handleArrChange={this.handleArrChange}
            />);

        default:
          throw new Error('Unknown step');
      }
    }




     handleSubmit(evt) {
      evt.preventDefault();
      this.props.onSubmit();
    }
    


   

      submitUser(event){
     
      event.preventDefault();

        //User object with all user details
         let user = {
            _id:this.props.id, 
            userName:this.state.userName,
            userPassword:this.state.password,
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            address:this.state.address1,
            city:this.state.city,
            region:this.state.state,
            postalCode:this.state.zip,
            country:this.state.country,
            email:this.state.email,
            cuisineLikes:this.state.cuisineLikes,
            cuisineDislikes:this.state.cuisinesDislikes,
            foodLikes:this.state.foodLikes,
            foodDislikes:this.state.foodDislikes,
            flavorLikes:this.state.flavorLikes,
            flavorDislikes:this.state.flavorDisLikes,
            weeks:[],
            recipeLikes:[],
            recipeDislikes:[]
      };

   
     //Send user to Db
     axios.put(ENDPOINT + "/api/putUserData/", {
       user})
        .then(res => {if(res.data.success){
          window.location.href = 'http://www.chefistant.com'
        }})


  }


    //Get all food data and populate before page is loaded
     getFoodDataFromDb(){
      
          fetch(ENDPOINT + "/api/getData")
            .then(data => data.json())
            .then(res =>{
              
               this.setState({ 
              
                options: res.data[0].options,
                cuisines: res.data[0].cuisines, 
                flavors: res.data[0].flavors,
                types: res.data[0].types,
                foods:res.data[0].foods})
             });
        }

  


  handleChangeLikes = name => event =>  {
    
     event.preventDefault();

     var val=event.target.querySelector('input').id
     var arr = this['state'][name];

    if(arr.indexOf(val) > -1){
    arr = arr.splice(arr.indexOf(val),1)
    }else{
    arr.push(val) 
    }

    this.setState({
      name:arr
    })
   }




  handleChange = (e) => {
    console.log(e)
    const{name, value} = e.target;
    this.setState({
      [name]: value,
    });
    
  };




  handleNext = () => {
  
    this.setState(state => ({
      activeStep: state.activeStep + 1,

    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };
  
    
 


  render() {
   
    const { classes } = this.props;
    const { activeStep } = this.state;
   
   

    return (
       
     
      
      <form action='/' method="POST" onSubmit={this.submitUser.bind(this)}> 
      <React.Fragment>
        <CssBaseline />
    
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography className="title" component="h1" variant="h4" align="center">
              Get your own personal Chef
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {this.state.steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>

              {activeStep === this.state.steps.length ? ( 
                 
                <React.Fragment>
                
                   <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      type='submit'

                    >Submit</Button>
                </React.Fragment>
                
              ) 
              : 
              (
                <React.Fragment>
                  
                  {this.getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                     

                    >
                      {activeStep === this.state.steps.length - 1 ? 'Next' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
      </form>
    );
  }
}




export default compose(
  withStyles(styles),
  withRouter,
)(Checkout);

