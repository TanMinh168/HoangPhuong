import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

function ProfileScreen(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, name, email, password }))
  }
  const userUpdate = useSelector(state => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const myOrderList = useSelector(state => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;

  const useStyles = makeStyles((theme) => ({
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
    }
    dispatch(listMyOrders());
    return () => {

    };
  }, [userInfo])

  const classes = useStyles();

  return userInfo.isAdmin ? 
  <div>
      <Button
        href="../products-list"
        variant="contained"
        color="primary"
        style={{width: '15rem'}}
      >
        View Product List
      </Button>
      <br></br>
      <br></br>
      <Button
        href="../orders-list"
        variant="contained"
        color="primary"
        style={{width: '15rem'}}
      >
        View Order List
      </Button>
      <br></br>
      <br></br>
      <Button
        href="../users"
        variant="contained"
        color="primary"
        style={{width: '15rem'}}
      >
        View User List
      </Button>
      <div className="profile">
    <div className="profile-info">
      <div className="form">
        <form onSubmit={submitHandler} >
          <ul className="form-container">
          <Typography component="h1" variant="h5">
            User Profile
          </Typography>
          <br></br>
            <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={name}
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                />
            <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={email}
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                />
            <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  value={password}
                  label="Password"
                  name="password"
                  autoComplete="password"
                  autoFocus
                  onChange={(e) => setPassword(e.target.value)}
                />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Upload
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>

          </ul>
        </form>
      </div>
    </div>
  </div>
  </div>
     :
  <div className="profile">
    <div className="profile-info">
      <div className="form">
        <form onSubmit={submitHandler} >
          <ul className="form-container">
          <Typography component="h1" variant="h5">
            User Profile
          </Typography>
          <br></br>
            <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={name}
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  onChange={(e) => setName(e.target.value)}
                />
            <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  value={email}
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                />
            <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  value={password}
                  label="Password"
                  name="password"
                  autoComplete="password"
                  autoFocus
                  onChange={(e) => setPassword(e.target.value)}
                />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Upload
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>

          </ul>
        </form>
      </div>
    </div>
  </div>
}

export default ProfileScreen;