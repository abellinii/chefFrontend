import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#FFFBED',
    color:'black',
    paddingTop:'3%',
  },
  tabsRoot: {
    borderBottom: '1px solid #FFECB3',
    width:'100%'
  },
  tabsIndicator: {
    backgroundColor: '#FFECB3',
  },

  tabRoot: {
    textTransform: 'initial',
    maxWidth: '20%',
    minWidth:'20%',
    width:'20%',
    fontWeight: '',
    marginRight: '',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: 'black',
      backGroundColor:'#D8E1E7',

      opacity: 1,
    },
    '&$tabSelected': {
      color: 'black',
      fontWeight: '',
      backgroundColor: '#FFECB3',
    },
    '&:focus': {
      color: 'white' ,
    },
  },
  tabSelected: {
    backgroundColor: '#FFECB3',
    color:'#000000'
  },
  typography: {
    padding: '',
    backgroundColor: '#FFECB3',
    fontFamily: 'Arvo, serif'
  },
  myWidth:{
    flexgrow:1,
    width:'100%',
   
  },
});

class SmallNav extends React.Component {
  


  state = {
    value: 2,
  };




  handleChange = (event, value) => {
    this.setState({ value });

    if(value === 0){ this.props.dec()};
    if(value > 0 & value < 4){

      
      this.props.week(value)

    }
    if(value === 4){this.props.inc()}

}




 

 

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.myWidth}>
<AppBar position="static" color="default">
        <Typography className={classes.typography} variant="h6">{this.props.name}</Typography>
       <Tabs
          value={value}
          onChange={this.handleChange}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
          
          
           
        > 
        { this.props.renderTabs.map((date,index)=>{
            return  (<Tab
            key = {index}
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected, }}
            label={date}
            onChange={this.handleChange2}
          />)
          })}
        </Tabs>
       
   </AppBar>     
      </div>
    );
  }
}

SmallNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SmallNav);