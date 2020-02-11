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
    <AppBar position="fixed" className={[classes.appBar, (props.miscData.openLeftMenu ? classes.appBarShift : ""), classes.appBar2, (props.miscData.openRightMenu ? classes.appBarShift2 : ""), classes.appBar3, ((props.miscData.openLeftMenu && props.miscData.openRightMenu) ? classes.appBarShift3 : "")].join(" ")}>
      
      <Toolbar>
        {props.leftMenu && (
        <IconButton color="inherit" aria-label="open drawer" onClick={e => props.miscAction.setState({openLeftMenu: true})} edge="start" className={clsx(classes.menuButton, { [classes.hide]: props.miscData.openLeftMenu, })}>
          {props.leftMenuIcon ? (props.leftMenuIcon) : (<MenuIcon />)}
        </IconButton>
        )}
        <Typography variant="h6" noWrap className={classes.title2}>
          Warkop.js
        </Typography>
        <ProfileMenu {...props} />
        {props.rightMenu && (
        <IconButton aria-label="cart" color="inherit" edge="end" onClick={e =>props.miscAction.setState({openRightMenu: true})} 
          className={clsx(props.miscData.openRightMenu && classes.hide)}
        >
          {props.rightMenuIcon ? (props.rightMenuIcon) : (<MenuIcon />)}
        </IconButton>
        )}
      </Toolbar>
    </AppBar>
  )
}
