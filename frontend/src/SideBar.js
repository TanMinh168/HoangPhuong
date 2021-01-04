import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import './App.css';
import { Button, Grid } from '@material-ui/core';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductList from './screens/ProductList';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import ProductCreateForm from './screens/ProductCreateForm';
import ProductUpdateForm from './screens/ProductUpdateForm';
import UserList from './screens/UsersScreen';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function SideBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: open, })}>
          <Toolbar>
            <Grid container>
              <Grid item xs={1}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="h4" noWrap>
                  <Link to="/">FC Anh em</Link>
                </Typography>
              </Grid>
              <Grid item xs={2} style={{ paddingTop: '0.4rem' }}>
                <Link to="/cart" ><AddShoppingCartIcon /></Link>
                {
                  userInfo ? <Link to="/profile" style={{ fontSize: '1rem' }}>Welcome back, {userInfo.name}</Link> :
                    <Link to="/signin" ><ExitToAppIcon /></Link>
                }

              </Grid>
            </Grid>



          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          {userInfo ?
            <List>
              <ListItem button>
                <Link to="../category/Kit" style={{ textDecoration: 'none', color: '#203040' }}>
                  <Grid container>
                    <Grid item xs={6}>
                      <ListItemIcon style={{ paddingTop: '.2rem' }}><ChildCareIcon /></ListItemIcon>
                    </Grid>
                    <Grid item xs={6}>
                      <ListItemText><i class="fas fa-kickstarter-k    "></i></ListItemText>
                    </Grid>
                  </Grid>
                </Link>
              </ListItem>
              <ListItem button>
                <Link to="../category/Accessories" style={{ textDecoration: 'none', color: '#203040' }}>
                  <Grid container>
                    <Grid item xs={6}>
                      <ListItemIcon style={{ paddingTop: '.2rem' }}><ChildCareIcon /></ListItemIcon>
                    </Grid>
                    <Grid item xs={6}>
                      <ListItemText>Accessories</ListItemText>
                    </Grid>
                  </Grid>
                </Link>
              </ListItem>
            </List>
            : <div></div>
          }
        </Drawer>
        <main className={clsx(classes.content, { [classes.contentShift]: open, })}>
          <div className={classes.drawerHeader} />
          <div className="content" style={{ minHeight: '37rem' }}>
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product-create" component={ProductCreateForm} />
            <Route path="/product-update/:id" component={ProductUpdateForm} />
            <Route path="/products-list" component={ProductList} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/orders-list" component={OrdersScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/users" component={UserList} />
          </div>
        </main>
      </div>
      <footer className="footer">
        All right reversed.
    </footer>
    </BrowserRouter>

  );
}
