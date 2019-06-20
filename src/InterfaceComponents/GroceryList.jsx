import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Divider from '@material-ui/core/Divider';
import { parse } from 'recipe-ingredient-parser';


const styles = theme => ({
  root: {
    width: '100%',
    maxHeight:'100%',
    minHeight:'100%',
    overflow:'scroll',
   height:'auto',
   marginTop:'-15%',

    backgroundColor: '#FFF4D3',

    overRide:{
      width:'10px'
    }
  },
});


var list =[]

class GroceryList extends React.Component {
  state = {
    checked: [0],
    groceries:this.getList(this.props.currentWeekGroceries),
    list: null,
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };





















//-----------------------------------------------------------------------------------



  getList(input){
   //Break Object from keys
   var newInput = Object.entries(input)
     //Iterate through each day
     for (var [day,entrie] of newInput){
      //Break meals from days     
      var newInput = Object.entries(entrie)
        //Iterate through meals 
        for (var [time,entrie] of newInput){
           //Map through recipe ingredients
           entrie.ingredients.map((ing)=>{
   //parse ingredient from ('1 teaspoon basil')     -->  { quantity: 1, unit: 'teaspoon', ingredient: 'basil'};     
           var  parsedIngredient= parse(ing)
           //Add ingredient to list
          return this.makeList(parsedIngredient, list);

       
       })
    }
 }
 
return list;

}




makeList(item, list){
  //Keep track of if the same item has been found on the list
  var found = false;
 
  //If the list is empty add first ingredient 
  if(list.length !== 0){
    //Check the list for the given item
   list.map((g)=>{
         
         //If item matches add quantity to list and move on  
         if(g[1] === item.ingredient){         
           g[0] += Number(item.quantity);
          return found=true; 
         }
    
   })}else{
  
  list.push([Number(item.quantity),item.ingredient]);
   found=true;
 }


//If item not yet in list then add to list
if(found === false){
list.push([Number(item.quantity),item.ingredient]);

}
}

//covert functtion needs to implemented
convert(Mt){

}







//------------------------------------------------------------------------------------------
























  render() {


    


    const { classes } = this.props;

    return (
      <List className={classes.root}>
       <ListItem key={0} >
           <i className="  material-icons fontSizeSmall">create</i>
            <ListItemText primary="Quantity" />
            <ListItemText primary="Item" />
            
                       </ListItem>
                       <Divider/>
        {this.state.groceries.map(value => (
          <ListItem className="groceryList" key={value} role={undefined}  onClick={this.handleToggle(value)}>
            <Checkbox
              checked={this.state.checked.indexOf(value) !== -1}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText primary={value[0]} />
            <ListItemText primary={value[1]} />
            <ListItemSecondaryAction>
              <IconButton aria-label="Comments">
                <ClearIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

GroceryList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroceryList);