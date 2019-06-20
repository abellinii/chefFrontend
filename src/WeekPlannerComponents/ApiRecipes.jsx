import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Close from '@material-ui/icons/Close';
import Remove from '@material-ui/icons/Remove';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AddDialog from './AddDialog';






const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary,
    height:'100%',  
  },
  color:{
     backgroundColor: "#FFECB3",
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  title: {
    color: 'white',
  },
  titleBar: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  hov:{
    cursor:'pointer'
  },
  closeBut:{
    marginTop:"1%",
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent:'space-around'  
  },
  width:{
    width:"100%",
  },
  height:{
    height:"90vh",
},
box:{
    boxShadow:" 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)"
},
height1:{
    height:"2%"
},
height2:{
    height:"100%"
},
instructions:{
    boxShadow: "none",
    display: 'flex',
    flexWrap: 'wrap',  
    backgroundColor: "#EFEBE9",
    maxHeight:'100%',
    marginLeft:"6%",
     overflow: 'auto',
},
ingredients:{
    overflow: 'hidden',
    backgroundColor: "#EFEBE9",
    height:'100%',
    marginLeft:"2%"
},
ingPic:{   
    overflow: 'auto',
    height:"100%",
    
    backgroundColor: "#EFEBE9",
    boxShadow:" 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)" 
},
dialog:{
     marginRight:'5%'
}
});



//Transition for dialog to slide up the screen
function Transition(props) {
  return <Slide direction="up" {...props} />;
}











class ApiRecipes extends React.Component {
   
 

  constructor(props){
        super(props);
      
        this.state = {
          id:'',
          open: false,
          title:'',
          image:'',
          timeToCook:'',
          ingredients:'',
          instructions:'',
          RecipeId:''
         };

  this.showRecipe = this.showRecipe.bind(this);
  this.getIngredients =this.getIngredients.bind(this);
  this.getInstrucctions = this.getInstructions.bind(this);
}
 



//Show recipe from API called recipe once its clicked
 showRecipe(event){
    event.preventDefault()
    if(!this.state.open){
         this.setState({ id:event.currentTarget.id,
                         open: this.state.open?false:true ,
                         title:this.props.tileData[event.currentTarget.id]["title"],
                         recipeId:this.props.tileData[event.currentTarget.id]["id"],
                         image:this.props.tileData[event.currentTarget.id]["image"],
                         timeToCook:this.props.tileData[event.currentTarget.id]["readyInMinutes"],
                         ingredients:this.getIngredients(this.props.tileData[event.currentTarget.id]["missedIngredients"]),
                         instructions:this.getInstructions(this.props.tileData[event.currentTarget.id]["analyzedInstructions"])
                          });
                          }
                    }







//Increase image size for when recipe is shown on click
makeImgLarger(str){
return str.replace('312x231','636x393')
}




//extract ingredints into array and return
getIngredients(data){
  var arr=[];
  data.map((d)=>{
                  return arr.push(d.original);
                 })
  return arr;
}


//extract instructions into array and return
getInstructions(data){
   var arr=[];
   data[0].steps.map((d)=>{
                           return arr.push(d.step);

                           })
   return arr;
}




handleClose = () => {
    this.setState({ open: false });   
  };





render(){
 const { classes } = this.props;

  return (


    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>


               {/*Loop through the API calls and show in a horizontal list for user to view  */}
                {/*Check recipe has instructions */}
                {this.props.tileData.map((tile,i) => (

                 tile.analyzedInstructions.length > 0 &&
                <GridListTile className={classes.hov} onClick={this.showRecipe.bind(this)} id={i} key={tile.title + i}>
                <img src={tile.image} alt={tile.title} />
                  <GridListTileBar
                  title={tile.title}
                  classes={{
                  root: classes.titleBar,
                  title: classes.title,
                  }}

                  />

                {/* Dialog for when a recipe is clicked. Brings up a large version of the recipe with instructions/ingredients   */}
                  <Dialog
                  open={this.state.open}
                  TransitionComponent={Transition}
                  keepMounted
                  maxWidth="xl"
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                  >


                  <Grid container  className={classes.color} spacing={12} xs={12}>

                      <Grid item xs={10}>
                          <DialogTitle   id="alert-dialog-slide-title">
                              {this.state.title}
                          </DialogTitle>
                      </Grid>

                  <Grid item xs={2} className={classes.closeBut}>

                     {/*Open Dialog to add recipe to users meal plan for the week  */}
                    <AddDialog handleParentClose={this.handleClose} resetMeals={this.props.resetMeals} week={this.props.week} setRecipe={this.props.addRecipe} {...this.state} className={classes.dialog}/>
                   
                    <div>
                      <Button color="primary" variant='outlined' onClick={this.handleClose}>
                        <Close />
                      </Button>
                    </div>



                  </Grid>


                  <DialogContent>
                  <Grid container className={classes.height} spacing={12} xs={12}>
                  <Grid item  className={classes.height2} xs={3}>
                  
                   {/*Ingredient list for recipe dialog popup */}
                  <List
                  component="nav"
                  subheader={<ListSubheader className={classes.height1} component="div">Ingredients</ListSubheader>}
                  className={classes.ingredients}
                  disablePadding="true"
                  >
                        <div>
                                      {/*Loop through the ingredient array and display  */}
                                    {
                                    this.state.ingredients && this.state.ingredients.map((item,i)=>{
                                    return     <ListItem button key={item + i}>
                                    <ListItemIcon>
                                    <Remove />
                                    </ListItemIcon>
                                    <ListItemText primary={item}/>
                                    </ListItem>


                                    })
                                    }

                        </div>


                  </List>
                  </Grid>

                  {/*Img and Instructions*/}
                  <Grid container spacing={12} xs={9}       className={classes.ingPic} >
                  <Grid item xs={12}  >
                  {/*Image recipe dialog popup */}
                  <img src={this.makeImgLarger(this.state.image)} className={classes.width} alt={this.state.title} />

                        {/*Instructions list for recipe dialog popup */} 
                        <List
                        subheader={<ListSubheader component="div">Instructions</ListSubheader>}
                        className={classes.instuctions}
                        >

                                    {/*Loop through the instructions array and display  */}
                                    {
                                    this.state.instructions && this.state.instructions.map((item,i)=>{
                                    return     <ListItem button key={item + i}>
                                    <ListItemIcon>
                                    {i+1 + "."}
                                    </ListItemIcon>
                                    <ListItemText primary={item}/>
                                    </ListItem>


                                    })
                                    }




                        </List>
                  </Grid>
                  </Grid>
                  </Grid>
                  </DialogContent>
                  </Grid>
                  </Dialog>
                  </GridListTile>
                  ))}
      </GridList>
    </div>
  );
}}

ApiRecipes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApiRecipes);