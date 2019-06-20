
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';





//Part 1 of new user questionaire






 export default class AddressForm extends Component {
  

  


  render() {

    return (
     <React.Fragment>

    
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
          <TextField
            required
            id="userName"
            name="userName"
            label="User name"
            fullWidth
            autoComplete="uname"
            onChange={this.props.handleChange}
            value={this.props.userName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            fullWidth
            autoComplete="password"
            onChange={this.props.handleChange}
            value={this.props.password}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
            onChange={this.props.handleChange}
            value={this.props.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
            onChange={this.props.handleChange}
            value={this.props.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address "
            fullWidth
            autoComplete="billing address-line1"
            onChange={this.props.handleChange}
            value={this.props.address}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
            onChange={this.props.handleChange}
            value={this.props.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
           id="state"
           name="state"
           label="State/Province/Region"
           fullWidth onChange={this.props.handleChange}
          value={this.props.region}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
            onChange={this.props.handleChange}
            value={this.props.postalCode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
            onChange={this.props.handleChange}
            value={this.props.country}
          />
        </Grid>
          <Grid item xs={12}>
          <TextField
            required
            id="email"
            type="email"
            name="email"
            label="Email"
            fullWidth
            className="validate"
            onChange={this.props.handleChange}
            value={this.props.email}
          />
        </Grid>
      {/*Potential for future use if payment is required*/}
        {/*<Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
            onChange={this.props.handleChange}
            value={this.props.billingAddress}
          />
        </Grid>*/}
      </Grid>
     
    </React.Fragment>
    );
  }
}




