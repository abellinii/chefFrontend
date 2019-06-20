
import React, { Component } from 'react';






export default class Footer extends Component{

render(){


  return(

<div>
  <footer className="page-footer amber lighten-4">
    <div className="container">
      <div className="row">
        <div className="col l6 s12">
          <h5 className="black-text">Why we exist</h5>
          <p className="black-text text-lighten-4">After being sick and tired of spending the precious little time we have in grocery stores/ meal planning or preparing a shopping list. We decided enough was ENOUGH! There must be a better way. So we decided to simplify, automate and optimise the experience in the kitchen</p>


        </div>
        <div className="col l3 s12">
          <h5 className="black-text">Recipes from</h5>
          <ul>
            <li><a className="black-text" href="#!">Link 1</a></li>
            <li><a className="black-text" href="#!">Link 2</a></li>
            <li><a className="black-text" href="#!">Link 3</a></li>
            <li><a className="black-text" href="#!">Link 4</a></li>
          </ul>
        </div>
        <div className="col l3 s12">
          <h5 className="black-text">Stores</h5>
          <ul>
            <li><a className="black-text" href="#!">Link 1</a></li>
            <li><a className="black-text" href="#!">Link 2</a></li>
            <li><a className="black-text" href="#!">Link 3</a></li>
            <li><a className="black-text" href="#!">Link 4</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-copyright">
      <div className="container">
      Made by <a className="brown-text text-lighten-3" href="http://materializecss.com">Abellinii Design</a>
      </div>
    </div>
  </footer>
</div>
    
  )
}
}


