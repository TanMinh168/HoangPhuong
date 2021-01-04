import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { savePayment } from '../actions/cartActions';
import CheckOutSteps from '../components/CheckOutSteps';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


function PaymentScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();
  const useStyles = makeStyles((theme) => ({
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push('placeorder');
  };
  return (
    <div>
      <CheckOutSteps step1 step2 step3></CheckOutSteps>
      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            <li>
              <h2>Payment</h2>
            </li>

            <li>
              <div>
                <FormControlLabel 
                    control={<Radio color="primary" /> } 
                    label="Paypal" 
                    value="paypal"
                    name="paymentMethod"
                    id="paymentMethod"
                    onChange={(e) => setPaymentMethod(e.target.value)} />
              </div>
            </li>

            <li>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Continue
            </Button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}
export default PaymentScreen;