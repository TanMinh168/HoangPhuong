import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckOutSteps from '../components/CheckOutSteps';
import { createOrder } from '../actions/orderActions';
import Button from '@material-ui/core/Button';
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
  const taxPrice = 0.1 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const placeOrderHandler = () => {
    // create an order
    dispatch(createOrder({
      userId: userInfo._id, orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice, taxPrice, totalPrice
    }));
    props.history.push("/");
  }
  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._id);
    }

  }, [success]);

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
                href="../"
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
  </div>

}

export default PlaceOrderScreen;