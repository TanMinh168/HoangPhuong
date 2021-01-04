import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { MenuItem } from '@material-ui/core';
function CartScreen(props) {

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  // bỏ sản phẩm khỏi giỏ hàng
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, []);

  // xác nhận thanh toán
  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  }

  return <div className="cart">
    <div className="cart-list">
      <ul className="cart-list-container" style={{width:'80%'}}>
        <li>
          <h1>
            Shopping Cart
          </h1>
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
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <div className="cart-image">
                    <img src={item.image} alt="product" />
                  </div>
                </Grid>
                <Grid item xs={8}>
                <div className="cart-name">
                  <div>
                    <Link to={"/product/" + item.product}>
                      {item.name}
                    </Link>
                  </div>
                  <div style={{marginTop: '2rem'}}>
                    <Grid container>
                            <Grid item xs = {2} >
                                <h3>Quantity: </h3>
                            </Grid>
                            <Grid item xs = {2} >
                                <FormControl variant="outlined"  style={{width:'115%'}}>
                                    <InputLabel id="quantity">Quantity</InputLabel>
                                    <Select
                                        id="quantity"
                                        label="quantity"
                                        value={item.qty}
                                        onChange={(e) => dispatch(addToCart(item.product, e.target.value))}
                                    >
                                        {[...Array(item.countInStock).keys()].map(x =>
                                        <MenuItem key={x + 1} value={x + 1}>{x + 1}</MenuItem>
                                      )}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    
                  </div>
                </div>
                </Grid>
                <Grid item xs={2}>
                  <div className="cart-price">
                    ${item.price}
                  </div>
                  <div style={{textAlign: 'right', marginTop: '5rem'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        Delete
                      </Button>
                  </div>
                  
                </Grid>
              </Grid>
              
                
                
              </li>
            )
        }
      </ul>

    </div>
    <div className="cart-action">
      <h3>
        Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
        :
         $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
      </h3>

      <Button
        variant="contained"
        color="primary"
        onClick={checkoutHandler}
        disabled={cartItems.length === 0}
      >
      Proceed to Checkout
      </Button>

    </div>

  </div>
}

export default CartScreen;