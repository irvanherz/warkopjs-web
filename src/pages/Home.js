import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import ProductList from '../components/ProductList'
import axios from 'axios';
import AddProductDialog from '../components/AddProductDialog'
import { Redirect } from 'react-router-dom'

import MainAppBar from '../components/MainAppBar'
import MainDrawer from '../components/MainDrawer'
import CartDrawer from '../components/CartDrawer'


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(7),
    zIndex: 0
  },
  content2: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift2: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },

}));

export default function Home(props) {
  //Inits
  const [products, setProducts] = React.useState([])
  const [viewParameters, setViewParameters] = React.useState({})

  const [cartItems, setCartItems] = React.useState([])

  const [mainDrawerState, setMainDrawerState] = React.useState(false)
  const [cartDrawerState, setCartDrawerState] = React.useState(true)

  const [addProductDialogState, setAddProductDialogState] = React.useState(false)
  const classes = useStyles();

  //Update each 'viewParameter' changed
  useEffect(() => {
    var queries = Object.keys(viewParameters).map((key) => `${key}=${viewParameters[key]}`)
    var queryStrings = (queries.length) ? ('?' + queries.join('&')) : ''
    axios.get(`http://127.0.0.1:3001/products${queryStrings}`)
      .then(result => {
        setProducts(result.data.data)
      })
  }, [viewParameters])

  //Callbacks
  const loginData = localStorage.getItem('loginData')
  if (!loginData) return (<Redirect push to='/login' />)

  //Render
  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <MainAppBar mainDrawerState={mainDrawerState} setMainDrawerState={setMainDrawerState} cartDrawerState={cartDrawerState} setCartDrawerState={setCartDrawerState} cartItems={cartItems} setCartItems={setCartItems} viewParameters={viewParameters} setViewParameters={setViewParameters} />

        <main className={classes.content + " " + clsx(classes.content2, { [classes.contentShift2]: cartDrawerState, })}>
          <ProductList products={products} setProducts={setProducts} viewParameters={viewParameters} setViewParameters={setViewParameters} cartItems={cartItems} setCartItems={setCartItems} />
        </main>

        <MainDrawer state={mainDrawerState} setState={setMainDrawerState} addProductDialogState={addProductDialogState} setAddProductDialogState={setAddProductDialogState} />
        <CartDrawer state={cartDrawerState} setState={setCartDrawerState} cartItems={cartItems} setCartItems={setCartItems} />
      </div>
      {addProductDialogState && <AddProductDialog state={addProductDialogState} setState={setAddProductDialogState} />}
    </React.Fragment>
  )
}
