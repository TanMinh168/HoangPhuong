import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckOutSteps';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ShippingScreen(props) {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const dispatch = useDispatch();
    const classes = useStyles();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({address, city, postalCode, country}));
        props.history.push('payment')
    }

    return (
        <div>
            <CheckoutSteps step1 step2 ></CheckoutSteps>
            <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Shipping
            </Typography>
            <form className={classes.form} onSubmit={submitHandler}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    onChange={(e) => setAddress(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="city"
                    label="City"
                    name="city"
                    onChange={(e) => setCity(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="postal code"
                    label="Postal Code"
                    name="postal code"
                    onChange={(e) => setPostalCode(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="country"
                    label="Country"
                    name="country"
                    onChange={(e) => setCountry(e.target.value)}
                />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Continue
            </Button>
            </form>
        </div>
        </Container>
        </div>
      
    );
}