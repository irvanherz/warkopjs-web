import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import StyledBadge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ProfileMenu from './ProfileMenu'

import SearchBar from './SearchBar'


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  content: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(7),
    zIndex: 0
  },



  appBar2: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift2: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title2: {
    flexGrow: 1,
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


  appBar3: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift3: {
    width: `calc(100% - ${drawerWidth * 2}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

export default function MainAppBar(props) {
  const classes = useStyles();
  //Render
  return (
    <AppBar position="fixed" className={[classes.appBar, (props.mainDrawerState ? classes.appBarShift : ""), classes.appBar2, (props.cartDrawerState ? classes.appBarShift2 : ""), classes.appBar3, ((props.mainDrawerState && props.cartDrawerState) ? classes.appBarShift3 : "")].join(" ")}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" onClick={e => props.setMainDrawerState(true)} edge="start" className={clsx(classes.menuButton, { [classes.hide]: props.mainDrawerState, })}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap className={classes.title2}>
          ReactPOS
          </Typography>

        <SearchBar viewParameters={props.viewParameters} setViewParameters={props.setViewParameters} />

        <ProfileMenu />
        <IconButton aria-label="cart" color="inherit"
          edge="end"
          onClick={e => props.setCartDrawerState(true)}
          className={clsx(props.cartDrawerState && classes.hide)}>
          {
            props.cartItems.length ? (
              <StyledBadge badgeContent={props.cartItems.length} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            ) : (
                <ShoppingCartIcon />)
          }
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
