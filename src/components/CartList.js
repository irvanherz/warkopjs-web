import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import CartItem from './CartItem';
import CheckoutDialog from './CheckoutDialog';
import axios from 'axios'
import { withSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function CartList(props) {
  const [checkoutDialogState, setCheckoutDialogState] = React.useState(false)
  const [orderResponseData, setOrderResponseData] = React.useState([])
  const classes = useStyles();
  const cartItemCount = props.cartItems.length

  function onClickCheckout(e) {
    const payload = { orderItems: [] }

    props.cartItems.forEach((item) => {
      payload.orderItems.push({ product_id: item.id, qty: item.qty })
    })

    axios.post('http://127.0.0.1:3001/orders', payload)
      .then(response => {
        if (response.status === 200) {
          setOrderResponseData(response.data.data)
          setCheckoutDialogState(true)
          props.enqueueSnackbar('Product order successfully added to database.', {variant: 'success'})
          props.setCartItems([])
        }
      }).catch(error => {
        if(!error.response){
          props.enqueueSnackbar('Connection error!', {variant: 'error'})
        } else {
          if(error.response.data.errors){
            error.response.data.errors.forEach( e => {
              props.enqueueSnackbar(e.message, {variant: 'error'})
            })
          }
        }
      })
  }

  function onClickCancel(e) {
    props.setCartItems([])
  }
  return (
    <React.Fragment>
      <div style={{ flexGrow: 1 }}>
        {
          cartItemCount ? (
            <List className={classes.root} style={{ paddingTop: 0 }}>
              {props.cartItems.map((item) => <CartItem key={item.name} cartItem={item} cartItems={props.cartItems} setCartItems={props.setCartItems} />)}
            </List>
          ) : (
              <img alt='Your cart is empty!' src='http://localhost:3001/assets/emptycart.png' style={{ width: '100%', height: 'auto' }} />
            )
        }
      </div>
      {cartItemCount ? (
        <div style={{ margin: '16px' }}>
          <Button onClick={onClickCheckout} variant="contained" color="primary" edge='end' fullWidth style={{ marginBottom: '8px' }}>
            Checkout
          </Button>
          <Button onClick={onClickCancel} variant="contained" color="secondary" edge='end' fullWidth>
            Cancel
          </Button>
        </div>
      ) : (<div></div>)
      }
      <CheckoutDialog state={checkoutDialogState} setState={setCheckoutDialogState} orderResponseData={orderResponseData} setOrderResponseData={setOrderResponseData} onClick={onClickCheckout} />
    </React.Fragment>
  )
}

export default withSnackbar(CartList)