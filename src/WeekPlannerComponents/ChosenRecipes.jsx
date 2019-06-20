import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { getRecipes } from '../userDataParsing'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: "",
  },
  gridList: {
    width: '100%',
    height: 1000,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
    backgroundColor:''
  },
};


class ChosenRecipes extends React.Component{




  render(){
    const { classes } = this.props;
    var i = 0;
    var j = 0;

  return (
    <div className={classes.root}>
      <GridList cellHeight={200} spacing={1} className={classes.gridList}>
        
         {/*If recipe information is available iterate through and show picture and title*/}
         { this.props.recipePrototype ? this.props.recipePrototype.map(tile => {
             

             {/*Make image different sizes for ui*/}
          return(
          
          <GridListTile key={tile.picture + i++} cols={i % 3 ? 1 : i%2 ? 2 : 2} rows={i % 3 ? 1 : i%2 ? 2 : 3}>
            <img src={tile.picture.substring(0,5) == "https" ? tile.picture : require("../img/" + tile.picture)} alt={tile.title}  height='100%'/>
            <GridListTileBar
              title={tile.title}
              titlePosition="top"
              actionIcon={
                <IconButton className={classes.icon}>
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
              className={classes.titleBar}
            />
          </GridListTile>
        )      }) : null}
      </GridList>
    </div>
  );

}
}

ChosenRecipes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChosenRecipes);