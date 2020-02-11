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
  const classes = useStyles();
  const cartItemCount = props.cartData.items.length

  return (
    <React.Fragment>
      <div style={{ flexGrow: 1 }}>
        {cartItemCount ? (
            <List className={classes.root} style={{ paddingTop: 0 }}>
              {props.cartData.items.map((item) => <CartItem key={item.name} target={item} {...props} />)}
            </List>
          ) : (
              <img alt='Your cart is empty!' src='http://localhost:3001/assets/emptycart.png' style={{ width: '100%', height: 'auto' }} />
          )}
      </div>
      {cartItemCount && <CheckoutDialog {...props} /> }
    </React.Fragment>
  )
}

export default withSnackbar(CartList)