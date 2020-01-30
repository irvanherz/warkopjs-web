import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import StyledBadge from '@material-ui/core/Badge';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CartList from '../components/CartList';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
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
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
}));

export default function CartDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const cartItemCount = props.cartItems.length

  return (
    <React.Fragment>
    <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={props.state}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={e => props.setState(false)}>
            <ChevronRightIcon />
          </IconButton>
          <Divider orientation={'vertical'} />
          <div style={{flexGrow:1, textAlign:'center'}}>
          <IconButton aria-label="cart" color="inherit">
            {
             props.cartItems.length ? (
                <StyledBadge badgeContent={cartItemCount} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              ) : (
                <ShoppingCartIcon />
              )
            }
          </IconButton>
          </div>
        </div>
        <Divider />
        <CartList  cartItems={props.cartItems} setCartItems={props.setCartItems} />
      </Drawer>
      </React.Fragment>
  )
}
