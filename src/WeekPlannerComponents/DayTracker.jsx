import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const styles = {

root:{
    width:'auto',
    position:'relative',
    backgroundColor:'white',
    height:"14.27%",

},
breakfastPosition:{
    top:0,
    left:0,
    height:'100%'
},
lunchPosition:{
    top:0,
    left:'33.3%',
    height:'100%'
},
dinnerPosition:{
    top:0,
    left:'66.6%',
    height:'100%'
},
mealChecked: {
  	width:'33.3%',
  	position:'absolute',
  	backgroundColor:'rgba(204, 220, 255,0.5)'
},
mealUnchecked:{
     width:'33.3%',
     position:'absolute',
},
type:{
  	fontSize:'3rem',
  	textAlign:'center',
    paddingTop:'15%'
}
}

 class DayTracker extends Component {


      constructor(props){
            super(props);

            this.state ={
                    	  day:'',
                        dayArray:[],
                        planArray:[]
                        }

        }


//Before component mounts set values to state
componentWillMount(){
    let arr = this.props.dayArray;

     this.setState({
     	day:this.props.day,
     	checked:this.props.checked,
     	dayArray:arr,
     	planArray:this.props.planArray
     })
}


//If props change then change states
componentWillReceiveProps(nextProps){
   
    this.setState({
    day:nextProps.day,
    checked:nextProps.Checked,
    dayArray:nextProps.dayArray,
    planArray:nextProps.planArray
   })
    
}
  


  render() {
  	

     const { classes } = this.props;

    return (
    	<div className = {classes.root}>
   
      <Typography className = {classes.type}>{this.state.day}</Typography>
   
       <ButtonBase className={`${this.state.dayArray[0] === 1 ? classes.mealChecked : classes.mealUnchecked} ${classes.breakfastPosition}`}></ButtonBase>
       <ButtonBase className={`${this.state.dayArray[1] === 1 ? classes.mealChecked : classes.mealUnchecked} ${classes.lunchPosition}`}> </ButtonBase>
       <ButtonBase className={`${this.state.dayArray[2] === 1 ? classes.mealChecked : classes.mealUnchecked} ${classes.dinnerPosition}`}></ButtonBase>
      </div>
    );
  }
}







export default withStyles(styles)(DayTracker);