import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import auth0Client from '../Auth';
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';




var optionsLogged = {
  'Home':"/",
  //'About us':"",
  'Dashboard':"/interface",
  //'Recipes': "",
  //'Shopping list':"",
  'Meal plan':"/planyourweek" + moment().startOf('week').format('DDMMYYYY')
};


const optionsNotLogged = [
'Home',
'About us',
]

const styles = theme => ({
  root: {
    color:"#039be500",
  

  
  }
})

const ITEM_HEIGHT = 48;

class LongMenu extends React.Component {

      constructor(props){
    super(props);
   this.state = {
    anchorEl: null,
  }};
 

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { classes } = this.props;
    return (
      <div>
        <IconButton
          className="amber lighten-4"
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,

            },
          }}
        >
          {!auth0Client.isAuthenticated() && optionsNotLogged.map(option => (
            <MenuItem key={option} selected={option === 'Pyxis'} onClick={this.handleClose}>
              {option}
            </MenuItem>
          ))}
           {auth0Client.isAuthenticated() && Object.entries(optionsLogged).map((key) => (
           <NavLink key={"my" + key[0]} className={classes.root} to={key[1]}>
            <MenuItem key={key[0]} selected={key[0] === 'Pyxis'} onClick={this.handleClose}>
              {key[0]}
            </MenuItem>
           </NavLink>
          ))}
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(LongMenu);