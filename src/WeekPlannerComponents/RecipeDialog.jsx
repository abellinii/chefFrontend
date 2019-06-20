import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { withStyles } from '@material-ui/core/styles';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}



const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    height:'100%',
  
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: 'white',
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },

});

class RecipeDialog extends React.Component {
   
 

     constructor(props){
    super(props);
  
    this.state = {
      
        open: false,
    };
     }

     shouldComponentUpdate() {
    return false;
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
         <Button   classes={{
        root: styles.title // class name, e.g. `classes-nesting-root-x`
         // class name, e.g. `classes-nesting-label-x`
      }}onClick={this.handleClickOpen}>
                  <PlaylistAddIcon  />
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

export default withStyles(styles)(RecipeDialog);