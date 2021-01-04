import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct, saveProductReview } from '../actions/productActions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';
import Rating from '../components/Rating';
import { TextField, Typography } from '@material-ui/core';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
  }));

function ProductScreen (props) {

    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [image, setImage] = useState('');
    const productDetails = useSelector((state) => state.productDetails);
    const { product, loading, error } = productDetails;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const productReviewSave = useSelector((state) => state.productReviewSave);
    const { success: productSaveSuccess } = productReviewSave;
    const dispatch = useDispatch();
    const classes = useStyles();


    useEffect(() => {
        if (productSaveSuccess) {
            alert('Review submitted successfully.');
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
        }
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //
        }
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch actions
        dispatch(
          saveProductReview(props.match.params.id, {
            name: userInfo.name,
            rating: rating,
            comment: comment,
            image: image
          })
        );
    };

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
    }

    if(product) console.log(product.reviews);

   
    return <div>
        <div className="back-to-result">
            <Link to="/"> 
              <Grid container style={{width: '15rem'}}>
                <Grid item xs={2}><ArrowBackIcon/></Grid>
                <Grid item xs={10}>Back to Home Page</Grid>
              </Grid>
            </Link>
        </div>
        {loading ? <div>Loading...</div> :
        error ? <div>{error}</div> :
        (
            <div>
            <Grid container spacing = {1}>
                <Grid item xs = {4}> 
                    <div className="details-image">
                        <img src={product.image} alt="product"></img>
                    </div>
                </Grid>
                <Grid item xs = {4}>
                <div className="details-info">
                <ul>
                    <li>
                        <h2>{product.name}</h2>
                    </li>
                    <li>
                    <Rating
                      value={product.rating}
                      text={product.numReviews + ' reviews'}
                    />
                    </li>
                    <li>
                        <h3>Price: ${product.price}</h3>
                    </li>
                    <li>
                        <h3>Description:</h3>
                        <div>
                            {product.description}
                        </div>
                    </li>
                </ul>
            </div>
                </Grid>
                <Grid item xs = {4}>
                <div className="details-action">
                    <ul>
                        <li>
                        <Grid container spacing = {2}>
                            <Grid item xs = {4}>
                                <h3>Price:</h3>
                            </Grid>
                            <Grid item xs = {6}>
                                <h3 style={{fontWeight:'lighter'}}>${product.price}</h3>
                            </Grid>
                        </Grid>
                        </li>
                        <li>
                        <Grid container spacing = {2}>
                            <Grid item xs = {4}>
                                <h3>Status:</h3>
                            </Grid>
                            <Grid item xs = {6}>
                                <h3 style={{fontWeight:'lighter'}}>{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</h3>
                            </Grid>
                        </Grid>
                             
                        </li>
                        <li>
                        <Grid container spacing = {2}>
                            <Grid item xs = {4} >
                                <h3>Quantity: </h3>
                            </Grid>
                            <Grid item xs = {6} >
                                <FormControl variant="outlined"  style={{width:'115%'}}>
                                    <InputLabel id="quantity">Quantity</InputLabel>
                                    <Select
                                        id="quantity"
                                        label="quantity"
                                        //style={{marginLeft: '1rem'}}
                                        onChange={(e) => { setQty(e.target.value) }}
                                    >
                                        {[...Array(product.countInStock).keys()].map(x =>
                                            <MenuItem key={x + 1} value={x + 1}>{x + 1}</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        
                       
                        {product.countInStock > 0 && 
                        <div  style={{textAlign: "center"}}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                style={{marginTop: '3rem', width:'80%'}}
                                onClick={handleAddToCart}
                            >
                            Add to cart
                            </Button>
                        </div> }
                        </li>
                    </ul>
                </div>
                </Grid>
            </Grid>   
            <div>
            {!product.reviews.length && <div>There is no review</div>}
            <Grid container>
                <Grid item xs={8}>
                    <h2>Reviews</h2>
                    <div className="products">
                    {product.reviews.map((review) => (
                        <li key={review._id}>
                        <Card className={classes.root}>
                            <CardHeader
                                avatar={
                                <Avatar aria-label="" className={classes.avatar}>
                                    {review.name.substring(0, 1)}
                                </Avatar>
                                }
                                title={review.name}
                                subheader={review.createdAt.substring(0, 10)}
                            />
                             <CardMedia
                                className={classes.media}
                                image={review.image}
                                style={{width: '22rem'}}

                            />
                            <CardContent>
                                <Typography color="textSecondary" component="p">
                                    {review.comment}
                                </Typography>
                                <Typography color="textPrimary" component="p">
                                    {review.rating} Stars
                                </Typography>
                                
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                <ShareIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                        </li>
                    ))}
                    </div>
                </Grid>
                <Grid item xs={4}>
                        <h2>Write a customer review</h2>
                        {userInfo ? (
                        <div className="details-action">
                        <FormControl fullWidth style={{padding: '1rem'}}>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <h3 style={{marginTop: '1rem'}}>Rating:</h3>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <FormControl variant="outlined"  style={{width:'90%'}}>
                                            <InputLabel id="rating">Rating</InputLabel>
                                            <Select
                                                id="rating"
                                                label="rating"
                                                onChange={(e) => setRating(e.target.value)}
                                            >
                                                <MenuItem value="1">1 - Poor</MenuItem>
                                                <MenuItem value="2">2 - Fair</MenuItem>
                                                <MenuItem value="3">3 - Good</MenuItem>
                                                <MenuItem value="4">4 - Very Good</MenuItem>
                                                <MenuItem value="5">5 - Excelent</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                
                                <Grid container>
                                    <Grid item xs={4}>
                                        <h3>Comment:</h3>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                        id="outlined-multiline-static"
                                        variant="outlined" 
                                        name="comment"
                                        multiline
                                        rows={4}
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        margin="normal"
                                        style={{width:'90%'}}
                                    >
                                    </TextField>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={4}>
                                        <h3>Image:</h3>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                        variant="outlined" 
                                        name="image"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        margin="normal"
                                        style={{width:'90%'}}
                                    >
                                    </TextField>
                                    </Grid>
                                </Grid>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    style={{marginTop: '2rem', marginLeft: '3rem', width:'80%'}}
                                    onClick={submitHandler}
                                >
                                    Submit
                                </Button>
                        </FormControl>
                        </div>
                        ) : (
                        <div>
                            <h3>Please<Link to="/signin" style={{color: '#203040'}}> sign in</Link>to write a review.</h3>
                        </div>
                        )}
                </Grid>
            </Grid>
            
          </div>
          </div>    
        )
        }
    </div>
}
export default ProductScreen;