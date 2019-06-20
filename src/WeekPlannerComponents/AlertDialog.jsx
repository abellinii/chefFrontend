import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AlertDialogSlide extends React.Component {
   
     constructor(props){
    super(props);
  
  this.state = {
      foodsOfTheWeek:this.props.foodsOfTheWeek,
      unlikedFoodsOfTheWeek:this.props.unlikedFoodsOfTheWeek,
      cuisinesOfTheWeek:this.props.cuisinesOfTheWeek, 
      checkedB:this.props.checkedB,
      checkedL:this.props.checkedL,
      checkedD:this.props.checkedD,
      selectedWeek:this.props.selectedWeek,
      open: false,
  };
}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

callApi = () => {
  

this.props.getRecipes()

this.handleClose();
};


  render() {
    
    return (
      <div >
        <Button width='100%' variant="outlined" color="primary" onClick={this.handleClickOpen}>
          {this.props.title}
        </Button>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >

          {/*Confirm users selected options*/}
          <DialogTitle id="alert-dialog-slide-title">
            Confirm search
          </DialogTitle>
          <DialogContent>

            {/*Check if the user has selected a week and if not produce error*/}
            {!this.props.selectedWeek 
             ? <p>Before we start we will need to know what week to plan for... </p> : 

             

              <div>
               {/*Check if the user has selected a week and if not produce erro*/}
             <p>You want to plan for the week of 
              {/*Parse weekID and make readable for user*/}
              {" " + this.props.selectedWeek.substring(0, 2) + "/" + this.props.selectedWeek.substring(2, 4) + "/" + this.props.selectedWeek.substring(4, 8) + " "}
 
              {/*Check the users selected meals and show the appropriate selections*/}
            and you want {this.props.checkedB ? " Breakfast":""}
              {this.props.checkedL && this.props.checkedB && !this.props.checkedD
               ? " and Lunch":this.props.checkedL && this.props.checkedB
                ? ", Lunch" :this.props.checkedL ? " Lunch":""}{(this.props.checkedL || this.props.checkedB) && this.props.checkedD 
                  ? " and Dinner": this.props.checkedD ? " Dinner":""}{}</p>

               {/*Check users selected foods and show*/}
               <p>{this.props.foodData[0] 
                ? "You want to include these foods : " + this.props.foodData[0]["label"]:"You do not feel like any particular foods"}
                {this.props.foodData[1]
                  ?", " +this.props.foodData[1]["label"]  +" etc..." :null}

                 {/*Check users selected cuisines and show*/}
                {this.props.unlikedFoodData[0] 
                  ? "and not these foods : " + this.props.unlikedFoodData[0]["label"] : " and you have no foods you do not want to include"}{ this.props.unlikedFoodData[1] ?", "+ this.props.unlikedFoodData[1]["label"] +" etc...":null} </p>
                  </div> }
          </DialogContent>
          <DialogActions>

            {/*Buttons to either reject or to call API's*/}
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.callApi} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogSlide;