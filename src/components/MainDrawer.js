import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PostAddIcon from '@material-ui/icons/PostAdd';
import InsertChartOutlinedOutlinedIcon from '@material-ui/icons/InsertChartOutlinedOutlined';
import { useHistory } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    position: 'fixed'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 4,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 4,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
}));

export default function MainDrawer(props) {
  const classes = useStyles();
  const history = useHistory()

  return (
    <React.Fragment>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, { [classes.drawerOpen]: props.state, [classes.drawerClose]: !props.state, })}
        classes={{
          paper: clsx({ [classes.drawerOpen]: props.state, [classes.drawerClose]: !props.state })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={e => props.setState(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key='addproduct' onClick={() => { props.setAddProductDialogState(true) }}>
            <ListItemIcon><PostAddIcon /></ListItemIcon>
            <ListItemText primary='Add New Product' />
          </ListItem>
        </List>
        <List>
          <ListItem button key='stats' onClick={() => { history.push("/statistics") }} >
            <ListItemIcon><InsertChartOutlinedOutlinedIcon /></ListItemIcon>
            <ListItemText primary='Statistics' />
          </ListItem>
        </List>
        <List>
          <ListItem button key='signout' onClick={() => { localStorage.removeItem('loginData'); return (<Redirect push to='/login' />) }}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary='Sign out' />
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  )
}
