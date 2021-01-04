import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../actions/orderActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';


function OrdersScreen(props) {
  const orderList = useSelector(state => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete]);

  // xóa đơn hàng
  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  }
  return loading ? <div>Loading...</div> :
    <div className="content content-margined">
      <div className="back-to-result">
            <Link to="../profile" style={{cursor:'pointer', textDecoration: 'none'}}> 
              <Grid container style={{width: '15rem'}}>
                <Grid item xs={2}><ArrowBackIcon/></Grid>
                <Grid item xs={10}>Back to profile</Grid>
              </Grid>
            </Link>
        </div>
      <div className="order-header">
        <h3>Orders</h3>
      </div>
      <div className="order-list">

        <Table className="table">
          <TableHead>
            <tr>
              <TableCell>ID</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>User name</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHead>
          <TableBody>
            {orders.map(order => (<tr key={order._id}>
              <TableCell>{order._id}</TableCell>
              <TableCell>{order.createdAt}</TableCell>
              <TableCell>${order.totalPrice}</TableCell>
              <TableCell>{order.shipping.address}</TableCell>
              <TableCell>{order.shipping.city}</TableCell>
              <TableCell>{order.shipping.country}</TableCell>
              <TableCell>
                <Link onClick={() => deleteHandler(order)} style={{color: "#203040", cursor:'pointer'}}><DeleteIcon/></Link>
              </TableCell>
            </tr>))}
          </TableBody>
        </Table>

      </div>
    </div>
}
export default OrdersScreen;