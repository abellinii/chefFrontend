import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DayTracker from './DayTracker'
import Divider from '@material-ui/core/Divider';






const styles = {
root:{
    width:'100%',
    position:'relative',
    backgroundColor:'white',
    height:'99.3%'
},
day:{
 
    borderBottom:"1px solid black"
}
}





class WeekTracker extends Component {


constructor(props){
        super(props);

        this.state ={
              currentWeekGroceries:{},
              day:'',
              checked:'',
              planArray:[]
            }

}




componentWillMount(){

   this.setState({
   	day:this.props.day,
   	checked:this.props.checked,
   	planArray:this.props.planArray
   })
  

}




componentDidMount(){
   
    this.setState({
   	day:this.props.day,
   	checked:this.props.checked,
   	planArray:this.props.planArray
   })
    
}



componentWillReceiveProps(nextProps){
   
    this.setState({
    day:nextProps.day,
    checked:nextProps.checked,
    planArray:nextProps.planArray
   })
    
}

//------------------------------------------------------DB----------------------------------------------------------

  


  render() {

      const { classes } = this.props;
    
     

    return(

    	  
      

      
         <div className={classes.root}>
         <DayTracker className={classes.day} dayArray={this.state.planArray[0]} handleChoice={this.props.handleChoice} day="Monday"/>
         <Divider/>
         <DayTracker className={classes.day} dayArray={this.state.planArray[1]} handleChoice={this.props.handleChoice} day="Tuesday"/>
         <Divider/>
         <DayTracker className={classes.day} dayArray={this.state.planArray[2]} handleChoice={this.props.handleChoice} day="Wednesday"/>
         <Divider/>
         <DayTracker className={classes.day} dayArray={this.state.planArray[3]} handleChoice={this.props.handleChoice} day="Thursday"/>
         <Divider/>
         <DayTracker className={classes.day} dayArray={this.state.planArray[4]} handleChoice={this.props.handleChoice} day="Friday"/>
         <Divider/>
         <DayTracker className={classes.day} dayArray={this.state.planArray[5]} handleChoice={this.props.handleChoice} day="Saturday"/>
         <Divider/>
         <DayTracker className={classes.day} dayArray={this.state.planArray[6]} handleChoice={this.props.handleChoice} day="Sunday"/>
       
     

       </div>  
    );
  }
}







export default withStyles(styles)(WeekTracker);