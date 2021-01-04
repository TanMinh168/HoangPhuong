import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Grid, Typography } from '@material-ui/core';


function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts(category));
  }, [category]);


  // tìm kiếm sản phẩm theo từ khóa
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  // sắp xếp sản phẩm theo giá
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <>
      {category && <h2>{category}</h2>}

      <div className="filter">
        <Grid container>
          <Grid item xs={6}>
            <form noValidate autoComplete="off" onSubmit={submitHandler}>
              <Grid container>
                <Grid item xs={4}>
                  <TextField label="Product" variant="outlined"
                    name="searchKeyword"
                    onChange={(e) => setSearchKeyword(e.target.value)} />
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '.6rem' }}
                  >
                    Search
                </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={1} >
                <h3>Sort </h3>
              </Grid>
              <Grid item xs={6} >
                <FormControl variant="outlined" style={{ width: '8rem' }}>
                  <InputLabel id="sort">Sort</InputLabel>
                  <Select label="Sort" onChange={sortHandler}>
                    <MenuItem value="">Newest</MenuItem>
                    <MenuItem value="lowest">Lowest</MenuItem>
                    <MenuItem value="highest">Highest</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
            <ul className="products">
              {products.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <Link to={'/product/' + product._id}>
                      <img
                        className="product-image"
                        src={product.image}
                        alt="product"
                      />
                    </Link>
                    <div className="product-name">
                      <Link to={'/product/' + product._id}>{product.name}</Link>
                    </div>
                    <div className="product-brand">{product.brand}</div>
                    <div className="product-price">${product.price}</div>
                    <div className="product-rating">
                      <Rating
                        value={product.rating}
                        text={'(' + product.numReviews + ' reviews)'}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
    </>
  );
}
export default HomeScreen;