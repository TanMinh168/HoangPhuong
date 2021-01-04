import React from 'react';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { Grid } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PaymentIcon from '@material-ui/icons/Payment';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

function CheckoutSteps(props) {
  return <div className="checkout-steps">
    
    <div className={props.step1 ? 'active' : ''} >
      <Grid container>
        <Grid item xs={2}><ExitToAppIcon/></Grid>
        <Grid item xs={6} style={{paddingTop: '.2rem'}}>Sign In</Grid>
      </Grid>
    </div>
    <div className={props.step2 ? 'active' : ''} >
      <Grid container>
        <Grid item xs={2}><LocalShippingIcon/></Grid>
        <Grid item xs={6} style={{paddingTop: '.2rem'}}>Shipping</Grid>
      </Grid>
    </div>
    <div className={props.step3 ? 'active' : ''} >
      <Grid container>
        <Grid item xs={2}><PaymentIcon/></Grid>
        <Grid item xs={6} style={{paddingTop: '.2rem'}}>Payment</Grid>
      </Grid>
    </div>
    <div className={props.step4 ? 'active' : ''} >
      <Grid container>
        <Grid item xs={2}><CheckBoxIcon/></Grid>
        <Grid item xs={6} style={{paddingTop: '.2rem'}}>Place Order</Grid>
      </Grid>
    </div>
  </div>
}

export default CheckoutSteps;