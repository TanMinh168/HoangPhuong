import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps';
import { createOrder } from '../actions/orderActions';
import { detailsProduct, saveProduct } from '../actions/productActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';
function PlaceOrderScreen(props) {

  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const { cartItems, shipping, payment } = cart;
  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Math.round((0.1 * itemsPrice + Number.EPSILON) * 100) / 100;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  // tạo mới đơn hàng
  const placeOrderHandler = () => {
    dispatch(createOrder({
      userId: userInfo._id, orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice, taxPrice, totalPrice
    }));
    cartItems.map((item) => {
      dispatch(saveProduct({
        _id: item.product,
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        brand: item.brand,
        countInStock: item.countInStock - item.qty,
        rating: item.rating,
        description: item.description
      }));
    })
  }
  useEffect(() => {
    if (success) {
      handleClickOpen();
    }

  }, [success]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const continueShopping = () => {
    props.history.push("../");
  };

  return <div>
    <CheckOutSteps step1 step2 step3 step4 ></CheckOutSteps>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h3>
            Shipping
          </h3>
          <div>
            {cart.shipping.address}, {cart.shipping.city},
            {cart.shipping.postalCode}, {cart.shipping.country}
          </div>
        </div>
        <div>
          <h3>Payment</h3>
          <div>
            Payment method: {cart.payment.paymentMethod}
          </div>
        </div>
        <div>
          <ul className="cart-list-container">
            <li>
              <h3>
                Shopping Cart
          </h3>
              <div>
                Price
          </div>
            </li>
            {
              cartItems.length === 0 ?
                <div>
                  Cart is empty
                </div>
                :
                cartItems.map(item =>
                  <li>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>
                          {item.name}
                        </Link>

                      </div>
                      <div>
                        Quantity: {item.qty}
                      </div>
                    </div>
                    <div className="cart-price">
                      ${item.price}
                    </div>
                  </li>
                )
            }
          </ul>
        </div>

      
      </div>
      <div className="placeorder-action" style={{height: '22rem'}}>
        <ul>
            <li>
            <Button
                variant="contained"
                color="primary"
                onClick={placeOrderHandler}
                disabled={cartItems.length === 0}
                fullWidth
                // href="../"
            >
            Place Order
            </Button>
            </li>
            <li>
                <h3>Order Summary</h3>
            </li>
            <li>
                <div>Items</div>
                <div>${itemsPrice}</div>
            </li>
            <li>
                <div>Shipping</div>
                <div>${shippingPrice}</div>
            </li>
            <li>
                <div>Tax</div>
                <div>${taxPrice}</div>
            </li>
            <li>
                <div>Order Total</div>
                <div>${totalPrice}</div>
            </li>
        </ul>
      </div>

    </div>

    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Your order is created successfully"}</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
          Your order will be delivered within 5-8 days. Please pay attention to the phone when a delivery duration arrives and check the order items before paying. 
          </Typography>
          <Typography gutterBottom>
          If you have any comment, please contact us via email: tanminhtran168@gmail.com. Wish you a good day!
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Review order
          </Button>
          <Button onClick={continueShopping} color="primary" autoFocus>
            Continue shopping
          </Button>
        </DialogActions>
      </Dialog>

  </div>

}

export default PlaceOrderScreen;