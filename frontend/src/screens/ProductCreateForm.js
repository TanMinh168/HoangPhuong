import React, { useEffect, useState } from 'react';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct } from '../actions/productActions';
import { listProducts } from '../actions/productActions';
import { Grid } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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

function ProductCreateForm(props) {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [numReview, setNumReview] = useState('');
  const [uploading, setUploading] = useState(false);
  const productCreate = useSelector(state => state.productSave);
  const { loading: loadingSave, success: successSave, error: errorSave } = productCreate;
  const dispatch = useDispatch();

  // tạo mới sản phẩm
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProduct({ name, price, image, brand, category, countInStock, description, rating, numReview }));
    props.history.push("/");
  }

  const classes = useStyles();

  // đăng tải ảnh sản phẩm
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

  return (
    <div className="content content-margined">
      <div className="back-to-result">
        <Link href="../products-list" style={{ cursor: 'pointer', textDecoration: 'none' }}>
          <Grid container style={{ width: '15rem' }}>
            <Grid item xs={2}><ArrowBackIcon /></Grid>
            <Grid item xs={10}>Back to Product list</Grid>
          </Grid>
        </Link>
      </div>
      <Container component="main" style={{ width: '40rem' }}>
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Create Product
          </Typography>
          <form className={classes.form} onSubmit={submitHandler} noValidate>
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
                  name="name"
                  //id="name"
                  //autoComplete="name"
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
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
                  id="price"
                  type="number"
                  min="1"
                  autoComplete="price"
                  autoFocus
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Image"
                  name="image"
                  autoComplete="image"
                  autoFocus
                  onChange={(e) => setImage(e.target.value)}
                />
                <Input
                  type="file"
                  onChange={uploadFileHandler}
                  margin="normal"
                  fullWidth
                  disableUnderline
                  colorSecondary
                >
                </Input>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined" style={{ width: '100%', marginTop: '2rem' }} margin="normal">
                  <InputLabel id="rating">category</InputLabel>
                  <Select
                    id="category"
                    label="category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <MenuItem value={"Kit"}>Kit</MenuItem>
                    <MenuItem value={"Accesories"}>Accesories</MenuItem>
                  </Select>
                </FormControl>
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
                  autoComplete="brand"
                  autoFocus
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="number"
                  id="countInStock"
                  label="Count In Stock"
                  name="countInStock"
                  autoComplete="countInStock"
                  autoFocus
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
              autoComplete="description"
              autoFocus
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create
              </Button>

          </form>
        </div>
      </Container>
    </div>
  );
}

export default ProductCreateForm;