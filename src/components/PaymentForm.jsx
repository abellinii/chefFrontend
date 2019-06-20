import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';



//Part 2 of new user questionaire





const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const styles= {
  labels:{
    width:'100%',
    height:'100%'
  }
}


 class PaymentForm extends React.Component {
  

  


  render() {

  const { classes } = this.props;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Likes/Dislikes
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} md={6}>
          
           <FormControl className={classes.labels} >
          <InputLabel htmlFor="select-multiple-checkbox">Food Likes</InputLabel>
          <Select
            multiple
            name='foodLikes'
            value={this.props.foodLikes}
            onChange={this.props.handleChangeMultiple}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {this.props.foods.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={this.props.foodLikes.indexOf(name) > -1} id={name} onClick={this.props.handleChange("foodLikes",this)} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
          </FormControl>
       

        </Grid>
        <Grid item xs={12} md={6}>
               <FormControl className={classes.labels}>
          <InputLabel htmlFor="select-multiple-checkbox">Food Dislikes</InputLabel>
          <Select
            multiple
            value={this.props.foodDislikes}
            onChange={this.props.handleChangeMultiple}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {this.props.foods.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={this.props.foodDislikes.indexOf(name) > -1} id={name} onClick={this.props.handleChange("foodDislikes",this)}  />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
                <FormControl className={classes.labels}>
          <InputLabel htmlFor="select-multiple-checkbox">Flavor Likes</InputLabel>
          <Select
            multiple
            value={this.props.flavorLikes}
            onChange={this.props.handleChangeMultiple}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {this.props.flavors.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox   checked={this.props.flavorLikes.indexOf(name) > -1} id={name} onClick={this.props.handleChange("flavorLikes",this)} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
             <FormControl className={classes.labels}>
          <InputLabel htmlFor="select-multiple-checkbox">Flavor Dislikes</InputLabel>
          <Select
            multiple
            value={this.props.flavorDislikes}
            onChange={this.props.handleChangeMultiple}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {this.props.flavors.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox   checked={this.props.flavorDislikes.indexOf(name) > -1} id={name} onClick={this.props.handleChange("flavorDislikes",this)}/>
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
          </FormControl>
        </Grid>
             <Grid item xs={12} md={6}>
                <FormControl className={classes.labels}>
          <InputLabel htmlFor="select-multiple-checkbox">Cuisine Likes</InputLabel>
          <Select
            multiple
            value={this.props.cuisineLikes}
            onChange={this.props.handleChangeMultiple}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {this.props.cuisines.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox   checked={this.props.cuisineLikes.indexOf(name) > -1} id={name} onClick={this.props.handleChange("cuisineLikes",this)} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
             <FormControl className={classes.labels}>
          <InputLabel htmlFor="select-multiple-checkbox">Cuisine Dislikes</InputLabel>
          <Select
            multiple
            value={this.props.cuisineDislikes}
            onChange={this.props.handleChangeMultiple}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {this.props.cuisines.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox   checked={this.props.cuisineDislikes.indexOf(name) > -1} id={name} onClick={this.props.handleChange("cuisineDislikes",this)} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
          </FormControl>
        </Grid>


        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Would you like me to get smarter at knowing what you like as we cook together?"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
}


export default withStyles(styles)(PaymentForm)
