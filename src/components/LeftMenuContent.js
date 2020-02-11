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
import ViewListIcon from '@material-ui/icons/ViewList';
import StorefrontIcon from '@material-ui/icons/Storefront';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
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

export default function LeftMenuContent(props) {
  const classes = useStyles();
  const history = useHistory()

  return (
    <React.Fragment>
      
        <List>
          <ListItem button key='order' onClick={() => history.push('/home')} >
            <ListItemIcon><StorefrontIcon /></ListItemIcon>
            <ListItemText primary='Storefront' />
          </ListItem>
        </List>
        <List>
          <ListItem button key='order' onClick={() => history.push('/products')} >
          <ListItemIcon><ViewListIcon /></ListItemIcon>
            <ListItemText primary='Products' />
          </ListItem>
        </List>
        <List>
          <ListItem button key='order' onClick={() => history.push('/categories')} >
          <ListItemIcon><LocalOfferIcon /></ListItemIcon>
            <ListItemText primary='Categories' />
          </ListItem>
        </List>
        <List>
          <ListItem button key='stats' onClick={() => { history.push("/users") }} >
            <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
            <ListItemText primary='Users' />
          </ListItem>
        </List>
        <List>
          <ListItem button key='stats' onClick={() => { history.push("/statistics") }} >
            <ListItemIcon><InsertChartOutlinedOutlinedIcon /></ListItemIcon>
            <ListItemText primary='Statistics' />
          </ListItem>
        </List>
    </React.Fragment>
  )
}
