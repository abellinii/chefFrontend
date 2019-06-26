import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

const styles = {
  grid: {
    display:'block',
    

  },
};

function changeTime(date){
if(date){
return date.substring(4, 9) + "-" + date.substring(2, 4) + "-" + date.substring(0, 2)
}
}


class DatePickers extends React.Component {

   constructor(props){
    super(props);
  this.state = {
  
    selectedDate: "",
  };
}
//Before component mounts set values to state
componentWillMount(){


     this.setState({
       selectedDate:this.props.selectedWeek
     })
}


//If props change then change states
componentWillReceiveProps(nextProps){
   
    this.setState({
     selectedDate:nextProps.selectedWeek
   })
}

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.children !== nextProps.children;    
  }


  render() {
    const { classes } = this.props;
     
    return (
         
        <Grid container className={classes.grid} justify="space-around">
         <p>Week</p>
         {/* <TextField
        id="date"
        onChange={this.props.handleDateChange}
        type="date"
        value={changeTime(this.state.selectedDate)}
        InputLabelProps={{
          shrink: true,
        }}
      />*/}

        <DayPickerInput id="date" value={changeTime(this.state.selectedDate)} onDayChange={this.props.handleDateChange} />
     
               </Grid>
     
    );
  }
}



export default withStyles(styles)(DatePickers);