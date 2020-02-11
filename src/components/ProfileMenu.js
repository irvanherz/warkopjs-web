import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import { List } from '@material-ui/core';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function ProfileMenu(props) {
  function onSignout() {
    props.authAction.unsetLoginData()
    props.history.push('/')
  }
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {popupState => (
        <div>
          <IconButton aria-label="cart" color="inherit" edge="end"  {...bindTrigger(popupState)}>
            <AccountCircleIcon />
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box p={1} style={{minWidth:'200px'}}>
              <Avatar style={{margin:'auto'}} ><AccountCircleIcon /></Avatar>
              <List>
                <ListItem dense button>
                  <ListItemText primary='Edit Profile' />
                </ListItem>
                <ListItem dense button>
                  <ListItemText primary='Sign out' onClick={onSignout} />
                </ListItem>
              </List>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}