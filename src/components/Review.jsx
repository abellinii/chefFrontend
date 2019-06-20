import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';







//Part 3 of new user questionaire









const styles = theme => ({
  listItem: {
    padding: `${'10%'}px 0`,
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: '20%',
  },
  pad:{
    padding:'5% 15%'
  }
});

 class Review extends Component {


  render() {

  const { classes } = this.props;

  return (
    <React.Fragment>
      <Typography variant="h5" align='center' gutterBottom>
        REVIEW
      </Typography>
      <Grid className={classes.pad} container spacing={24}>
          <Grid item xs={12} sm={6}>
             <ListItem className='' key=''>
                <ListItemText inset='true' primary='USER NAME' secondary={this.props.userName}/>
                <Typography variant="body2"></Typography>
              </ListItem>
        </Grid>
        <Grid item xs={12} sm={6}>
            <ListItem className='' key=''>
                <ListItemText inset='true' primary='PASSWORD' secondary={this.props.password}/>
                <Typography variant="body2"></Typography>
            </ListItem>
        </Grid>
        <Grid item xs={12} sm={6}>
            <ListItem className='' key=''>
                <ListItemText inset='true' primary='NAME' secondary={this.props.firstName}/>
                <Typography variant="body2"></Typography>
            </ListItem>
        </Grid>
        <Grid item xs={12} sm={6}>
            <ListItem className='' key=''>
                <ListItemText inset='true' primary='SURNAME' secondary={this.props.lastName}/>
                <Typography variant="body2"></Typography>
            </ListItem>
        </Grid>
        <Grid item xs={12}>
            <ListItem className='' key=''>
                <ListItemText inset='true' primary='ADDRESS' secondary={this.props.address1}/>
                <Typography variant="body2"></Typography>
            </ListItem>
        </Grid>
        <Grid item xs={12} sm={6}>
            <ListItem className='' key=''>
                <ListItemText inset='true' primary='CITY' secondary={this.props.city}/>
                <Typography variant="body2"></Typography>
            </ListItem>
        </Grid>
        <Grid item xs={12} sm={6}>
            <ListItem className='' key=''>
                <ListItemText inset='true' primary='STATE/PROVINCE/REGION' secondary={this.props.state}/>
                <Typography variant="body2"></Typography>
            </ListItem>
        </Grid>
        <Grid item xs={12} sm={6}>
           <ListItem className='' key=''>
                <ListItemText inset='true' primary='ZIP/POSTAL CODE' secondary={this.props.zip}/>
                <Typography variant="body2"></Typography>
            </ListItem>
        </Grid>
        <Grid item xs={12} sm={6}>
            <ListItem className='' key=''>
                <ListItemText inset='true' primary='COUNTRY' secondary={this.props.country}/>
                <Typography variant="body2"></Typography>
            </ListItem>
         </Grid>
         <Grid item xs={12}>
            <ListItem className='' key=''>
                <ListItemText inset='true' primary='EMAIL' secondary={this.props.email}/>
                <Typography variant="body2"></Typography>
            </ListItem>
        </Grid>
        <Grid item xs={12}>
         
        </Grid>
        </Grid>
      
      
    </React.Fragment>
  );
}
}
Review.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Review);
