import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';





//To slide the dialog up the screen
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = {
  root:{
    justify:'center',
    width:'100%',
  },
  dialog:{
    margin:'2%'
  }
}   





class AddDialog extends React.Component {
   
    constructor(props){
          super(props);

          this.state = {

                        selectedDay:'',
                        selectedMeal:'',
                        meal:["Breakfast","Lunch","Dinner"],
                        day:["Monday","Tuesday","Wednesday","Thursay","Friday","Saturday","Sunday"],
                        open: false,
          };

    this.handleChange = this.handleChange.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.setRecipe = this.setRecipe.bind(this)
}




  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };


  //When a recipe is added filter up to parent (WeeKPlanner) and add recipe to database
  setRecipe(){

          //set Recipe
          this.props.setRecipe(this.state.selectedDay,this.state.selectedMeal,this.props.title,this.props.ingredients,this.props.instructions,this.props.image)

          this.setState({selectedMeal:"",
                         selectedDay:""})
          
          //reset the page for the new recipe to show and the week/tracker to be updated
          this.props.resetMeals(this.props.week)
          this.handleClose();
          this.props.handleParentClose();

  }






  render() {
    const { classes } = this.props;


    return (
      <div >
        <Button  variant="outlined" color="primary" onClick={this.handleClickOpen}>
           <PlaylistAddIcon/>
        </Button>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          maxWidth='xs'
          fullWidth={true}
        >

          {/*Confirm users selected options*/}
        
          <DialogContent >
            <DialogTitle id="alert-dialog-slide-title">
            ADD TO PLAN
          </DialogTitle>
          <div className={classes.dialog} >

        {/*Day to add recipe*/}
          <FormControl className={classes.root} variant="outlined" >                
                            <InputLabel
                            ref={ref => {
                            this.InputLabelRef = ref;
                            }}
                            htmlFor="outlined-age-simple"
                            >
                            Day
                            </InputLabel>  
                            <Select
                            value={this.state.selectedDay}
                            onChange={this.handleChange}
                            input={
                            <OutlinedInput
                            labelWidth= {this.state.labelWidth}
                            name="selectedDay"
                            id="outlined-age-simple"
                            />}>
                                    {this.state.day.map((option,index)=>{
                                    return  (

                                    <MenuItem key={"menuitem" + index} value={option}>{option}</MenuItem>)

                                    }
                                    )}

                            </Select>
                            </FormControl>
             </div>

            {/*Meal to add recipe*/}
             <div className={classes.dialog} >
                            <FormControl className={classes.root} variant="outlined" >
                            <InputLabel
                            ref={ref => {
                            this.InputLabelRef = ref;
                            }}
                            htmlFor="outlined-age-simple"
                            >
                            Meal
                            </InputLabel>  
                            <Select
                            value={this.state.selectedMeal}
                            onChange={this.handleChange}
                            input={
                            <OutlinedInput
                            labelWidth= {this.state.labelWidth}
                            name="selectedMeal"
                            id="outlined-age-simple"
                            />}>
                                    {this.state.meal.map((option,index)=>{
                                    return  (

                                    <MenuItem key={"menuitem" + index} value={option}>{option}</MenuItem>)

                                    }
                                    )}

                            </Select>
                            </FormControl>
                            </div>

          </DialogContent>
          <DialogActions>

            {/*Buttons to either reject or to add recipe*/}
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.setRecipe} color="primary">
              Add +
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(AddDialog);