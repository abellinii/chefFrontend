import React from 'react';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from  'react-router-dom';
import { render } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme =  createMuiTheme({
   palette: {
    primary: {main:'#000000'} ,
    secondary: {main:'#BDC4A7'} ,
  
  },
  TextField: {
  borderColor:'#000000' ,
  },
});;



function Root() {
  return (
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  );
}











render( 

 
<BrowserRouter >

	<Root />

	</BrowserRouter>
  ,document.getElementById('react-target'));

serviceWorker.unregister();