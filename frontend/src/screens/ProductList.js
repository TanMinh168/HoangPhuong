import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts, deleteProduct } from '../actions/productActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddBoxIcon from '@material-ui/icons/AddBox';


function ProductList(props) {
  const productList = useSelector(state => state.productList);
  const { loading, products, error } = productList;

  const productDelete = useSelector(state => state.productDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successDelete]);

  // xóa sản phẩm
  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  }

  console.log("product = " + products);

  return loading ? <div>Loading...</div> :
    <div className="content content-margined">
      <div className="back-to-result">
        <Link href="../profile" style={{ cursor: 'pointer', textDecoration: 'none' }}>
          <Grid container style={{ width: '15rem' }}>
            <Grid item xs={2}><ArrowBackIcon /></Grid>
            <Grid item xs={10}>Back to profile</Grid>
          </Grid>
        </Link>
      </div>

      <div className="product-header">
        <Grid container>
          <Grid item xs={8}>
            <Typography component="h1" variant="h5">
              Product list
          </Typography>
          </Grid>
          <Grid item xs={4} style={{ paddingLeft: '12rem' }}>
            <Link href="../product-create" style={{ color: '#203040', textDecoration: 'none' }}>
              <Grid container>
                <Grid item xs={1}><AddBoxIcon /></Grid>
                <Grid item xs={4} style={{ paddingTop: '.1rem', fontSize: '1rem' }}>Add product</Grid>
              </Grid>
            </Link>
          </Grid>
        </Grid>
      </div>
      <div className="product-list">

        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(product => (<TableRow key={product._id}>
              <TableCell>{product._id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.countInStock}</TableCell>
              <TableCell>{Math.round((product.rating + Number.EPSILON) * 10) / 10}</TableCell>
              <TableCell>
                <Link onClick={() => (window.confirm('Are you sure you wish to delete this item?')) ? deleteHandler(product) : {}} style={{ color: "#203040", cursor: 'pointer' }}><DeleteIcon /></Link>
                <Link href={"../product-update/" + product._id} style={{ color: "#203040", cursor: 'pointer' }}><CreateIcon /></Link>
              </TableCell>
            </TableRow>))}
          </TableBody>
        </Table>

      </div>
    </div>
}
export default ProductList;