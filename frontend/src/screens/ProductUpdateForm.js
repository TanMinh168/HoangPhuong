import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, saveProduct } from '../actions/productActions';
import { Grid, MenuItem, Select } from '@material-ui/core';
import axios from 'axios';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function ProductUpdateForm(props) {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [uploading, setUploading] = useState(false);
  const productUpdate = useSelector(state => state.productSave);
  const { loading: loadingSave, success: successSave, error: errorSave } = productUpdate;
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  // gửi thay đổi thông tin sản phẩm
  function submitHandler(e) {
    e.preventDefault();
    dispatch(saveProduct({
      _id: props.match.params.id,
      name: name ? name : product.name,
      price: price ? price : product.price,
      image: image ? image : product.image,
      category: category ? category : product.category,
      brand: brand ? brand : product.brand,
      countInStock: countInStock ? countInStock : product.countInStock,
      rating: rating ? rating : product.rating,
      description: description ? description : product.description
    }));
    //props.history.push("/")
  }

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    }
  }, []);

  // đăng tải ảnh
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  const classes = useStyles();

  return (loading ? <div>Loading...</div> :
    error ? <div>{error}</div> :
      <div className="content content-margined">
        <Container component="main" style={{ width: '40rem' }}>
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Update Product
          </Typography>
            <form className={classes.form} onSubmit={submitHandler} noValidate autoComplete="off">
              {loadingSave && <div>Loading...</div>}
              {errorSave && <div>{errorSave}</div>}
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Name"
                    defaultValue={product.name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Price"
                    name="price"
                    defaultValue={product.price}
                    autoComplete="price"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Input
                    type="file"
                    onChange={uploadFileHandler}
                    margin="normal"
                    fullWidth
                    disableUnderline
                    colorSecondary
                    style ={{paddingTop: '1rem', paddingLeft: '2rem'}}
                  >
                  </Input>
                </Grid>
                <Grid item xs={6}>
                  <Select
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="category"
                    label="category"
                    name="category"
                    defaultValue={product.category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <MenuItem value={"Kit"}>Kit</MenuItem>
                    <MenuItem value={"Accessories"}>Accessories</MenuItem>
                    <MenuItem value={"Ball"}>Ball</MenuItem>
                    <MenuItem value={"Poster"}>Poster</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="brand"
                    label="Brand"
                    name="brand"
                    defaultValue={product.brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="countInStock"
                    label="Count In Stock"
                    name="countInStock"
                    defaultValue={product.countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </Grid>
              </Grid>

              <TextField
                variant="outlined"
                style={{ marginTop: '2rem' }}
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                defaultValue={product.description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Update
              </Button>
            </form>
          </div>
        </Container>
      </div>
  );
}

export default ProductUpdateForm;