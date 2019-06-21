import React from 'react';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from  'react-router-dom';
import { render } from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

serviceWorker.unregister();
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

 
<HashRouter >

	<Root />

	</HashRouter>
  ,document.getElementById('react-target'));

serviceWorker.unregister();