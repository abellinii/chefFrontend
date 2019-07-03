import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';




const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: '3rem',
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: '',
    color: ''
  },
  pad:{
    paddingLeft:'3%',
    paddingTop:'2%',
    paddingBottom:'2%'
  },
    padItem:{
    paddingLeft:'1%',
    paddingTop:'1%'
  },
  expanded:{
   fontSize: '1.1rem',
   backgroundColor:'#95AFBA'

  },
    head:{  
      fontSize: '3rem',
    },

});
















class ControlledExpansionPanels extends React.Component {
 

  state = {
    expanded: null,
    expandedSecond:null,
    daysOfWeek:["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    meals:['Breakfast','Lunch', 'Dinner'],
    user:'',
    week:this.props.currentWeekGroceries
  };





  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };



   handleChangeSecond = panel => (event, expandedSecond) => {
    this.setState({
      expandedSecond: expandedSecond ? panel : false,
    });
  };



componentWillReceiveProps(nextProps){

 this.setState({

    week:nextProps.currentWeekGroceries
  })
    
}





    

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    const { expandedSecond } = this.state;
     






      return (
      <div className={classes.root}>
        {


//Display the day 


    this.state.daysOfWeek.map((day,index)=>{
        
     return(<React.Fragment key={day + index}>
     <ExpansionPanel  expanded={expanded === 'panel' + index} onChange={this.handleChange('panel' + index )}>
          <ExpansionPanelSummary className={classes.head} expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.head}>{this.state.daysOfWeek[index]}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expanded}>
                  <div className={classes.root}>
          {
                   
            this.state.meals && this.state.meals.map((meal,index2)=>{
              //var today = meal;
              var weekday = day;
             
              //var path=this['state']['week'][weekday][today]
            




                //Display the meal of the day


              return( <ExpansionPanel  key={day +meal} expanded={expandedSecond === 'panel' + day + meal } onChange={this.handleChangeSecond('panel' + day + meal)}>
                                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography key={day + meal + index} className={`${classes.root} ${classes.heading}`} >{meal}</Typography>
                                  </ExpansionPanelSummary>
                                  <ExpansionPanelDetails >
                                   







                                                      <Grid container spacing={24}>
                                                      <Grid container spacing={24}>
                                                      <Grid item xs={2}>
                                                                              
                                                      <img src={this['state']['week'][weekday][meal]['picture'].substring(0,5) === "https" ? this['state']['week'][weekday][meal]['picture'] : require("../img/" + this['state']['week'][weekday][meal]['picture'])} alt="meal img"  width='100%'/>
                                                      </Grid>
                                                      <Grid item xs={10}>
                                                      {this['state']["week"][weekday][meal]['title']}
                                                      </Grid>
                                                      </Grid>
                                                      <Grid item xs={12}>
                                                      <Divider />
                                                      </Grid>
                                                         <Grid container spacing={24} className={classes.pad}>
                                                         <Typography className={classes.heading}>Ingredients</Typography>
                                                      {
                                                        
                                                                          this['state']["week"][weekday][meal]['ingredients'].map((ing)=>{

                                                                            return(

                                                                         <Grid container xs={12} spacing={24}className={classes.padItem}>
                                                                                    
                                                                      <Grid item xs={2}>
                                                                      <i className="material-icons fontSizeSmall">remove</i>
                                                                      </Grid>

                                                                      <Grid item xs={10}>
                                                                      {' ' + ing}
                                                                      </Grid>
                                                                    

                                                                      </Grid>)
                                                                          })
                                            
                                                      //Ingredients
                                                      }
                                                           </Grid>
                                                      <Grid item xs={12}>
                                                      <Divider />
                                                      </Grid>
                                                      <Grid container spacing={24} className={classes.pad}>
                                                      <Typography className={classes.heading}>Steps</Typography>

                                                      {


                                                                                    this['state']["week"][weekday][meal]['ingredients'].map((step,index3)=>{

                                                                            return(

                                                                         
                                                                         <Grid container xs={12} spacing={24}className={classes.padItem}>
                                                                                    
                                                                      <Grid item xs={2}>
                                                                           {index3 + 1 +'.'}
                                                                      </Grid>
                         
                                                                      <Grid item xs={10}>
                                                                      {step}
                                                                      </Grid>
                                                                    </Grid>

                                                                     )
                                                                          })

                                                      //Steps
                                                      }

                                                       </Grid>
                                                      </Grid> 





                                      
                                   
                                  </ExpansionPanelDetails>
                                </ExpansionPanel>)
         
                  })
          }
                   </div>

          </ExpansionPanelDetails>
          }
        </ExpansionPanel>

</React.Fragment>)


    })

   }



      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);


