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

export default function LeftMenu(props) {
  const classes = useStyles();
  const history = useHistory()

  return (
    <React.Fragment>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, { [classes.drawerOpen]: props.miscData.openLeftMenu, [classes.drawerClose]: !props.miscData.openLeftMenu, })}
        classes={{
          paper: clsx({ [classes.drawerOpen]: props.miscData.openLeftMenu, [classes.drawerClose]: !props.miscData.openLeftMenu })
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={e => props.miscAction.setState({openLeftMenu:false})}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {props.content}
      </Drawer>
    </React.Fragment>
  )
}
