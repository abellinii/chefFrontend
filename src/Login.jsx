import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import Divider from '@material-ui/core/Divider'; 
import Link from '@material-ui/core/Link';




const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    marginBottom: '3%',
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: '#D4E157',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor:'#D4E157'
  },
  link:{

  },
  join:{
  	padding:'2%',
  }
});



function Login(props) {
  const { classes } = props;

  return (

    
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /><div>
  {/*}       
          <div id="login-buttons">
    <div class="login-text-and-button">
      <div class="login-button single-login-button " id="login-buttons-facebook">
        <div class="login-image" id="login-buttons-image-facebook"></div>
        <span id="sign-in-facebook" class="text-besides-image sign-in-text-facebook">Sign in with Facebook</span>
      </div>
      <br></br>
    </div>
    <div class="login-text-and-button">
      <div class="login-button single-login-button " id="login-buttons-google">
        <div class="login-image" id="login-buttons-image-google"></div>
        <span id="sign-in-google" class="text-besides-image sign-in-text-google">Sign in with Google</span> 
      </div>
    </div>
</div> */}

          </div> 
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >

            Sign in
          </Button>
          <Divider/>
          <Typography className={classes.join} >
          <Link href="/Join" className={classes.link}>
        Register
      </Link> to experience the magic 
           
        </Typography>
        </form>
      </Paper>
    </main>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);

