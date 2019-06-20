import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { getRecipes } from '../userDataParsing'









const styles = theme => ({
  root: {
    display: 'inline-block',
    flexWrap: 'nowrap',
    flexDirection:'row',
    justifyContent: 'space-around',
   
    backgroundColor: '#FFFBED',
    width:'100%',

   marginBottom:'2%'

    
  },
  gridList: {
    flexWrap: 'nowrap !important',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    height: '25vw',

   
  },
  border:{
     borderTopStyle: 'solid' ,
    borderTopWidth:'0.5px',
    borderTopColor:'black',
    paddingBottom:'0.5%'
  },
  title: {
    color: '',

  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  tile:{
    height: '23.5vw !important',
    width:'20vw'
  },
  box:{
  textAlign:'center',
   marginTop:'2%',
   fontFamily: 'Arvo, serif'
},
gridButton:{
  height:'100%',
  width:'100%',
  

}
});


 




class SingleLineGridList extends React.Component { 
  
   constructor(props){

    super(props);

    this.state={

                 recipeList:getRecipes(this.props.list) ? getRecipes(this.props.list) : {}
  
                }


                
               this.clickLeft = this.clickLeft.bind(this)
               this.clickRight = this.clickRight.bind(this)
               this.scroller = React.createRef();
   }








clickLeft(){
 this.scroller.current.scrollLeft = 400 ;
 console.log("right") 
}

clickRight(){
  this.scroller.current.scrollRight = 400 ;
 console.log("left")
}







render(){
const { classes } = this.props;

  return (


   <Grid container spacing={8} className={classes.root}>
        <Grid item xs={12} md={12}>
     <Typography className={classes.box} variant="h4" gutterBottom>
      Your Recipes
     </Typography>
   </Grid>
    
    <Grid container spacing={0} className={classes.border}>
   <Grid  item xs  >
<Button onClick={this.clickLeft} className={classes.gridButton}><i className="material-icons recipeIcons">
keyboard_arrow_left
</i></Button>
    </Grid>
     <Grid  item  xs={11}>
      <GridList  className={classes.gridList}  >
        {this.state.recipeList.map(tile => (
          tile.ingredients.length > 0  &&

         
          <GridListTile ref={this.scroller} className={classes.tile} key={tile.img}>
            <img src={tile.picture.substring(0,5) === "https" ? tile.picture : require("../img/" + tile.picture)} alt={tile.title}  height='100%'/>
            <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
      </Grid>

       <Grid item  xs  >
  <Button onClick={this.clickRight}className={classes.gridButton}><i className="material-icons  recipeIcons">
keyboard_arrow_right
</i>

</Button>
    </Grid>
    </Grid>

    </Grid>
   
    
  );
}
}

SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleLineGridList);



