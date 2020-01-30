import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import StyledBadge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import WorkIcon from '@material-ui/icons/Work';
import currencyFormatter from 'currency-formatter'

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import InputBase from '@material-ui/core/InputBase';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CartItem(props) {
  const classes = useStyles();

  function onDeleteClicked(){
    const newCartItems = props.cartItems.filter((item) => {
      if(props.cartItem.id === item.id) return false
      else return true
    })
    props.setCartItems(newCartItems)
  }

  function onDecrementCartItem(){
    var newCartItems = props.cartItems.map(item => {
      if(item.id === props.cartItem.id) {
        item.qty--
        return item
      } else return item
    })
    newCartItems = newCartItems.filter(item => {
      if(item.qty) return true
      else return false
    })
    props.setCartItems(newCartItems)
  }

  function onIncrementCartItem(){
    var newCartItems = props.cartItems.map(item => {
      if(item.id === props.cartItem.id) {
        item.qty++
        return item
      } else return item
    })
    props.setCartItems(newCartItems)
  }

  return (
    <React.Fragment>
      <ListItem button>
        <ListItemAvatar>
            <StyledBadge badgeContent={props.cartItem.qty} color="secondary">
              <Avatar><WorkIcon /></Avatar>
            </StyledBadge>
        </ListItemAvatar>
        <ListItemText primary={currencyFormatter.format(props.cartItem.price,{code:'IDR'})} secondary={props.cartItem.name} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={onDeleteClicked}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
       <ButtonGroup size="small" aria-label="small outlined button group">
          <Button onClick={onDecrementCartItem}>-</Button>
          <Button style={{maxWidth:'15px'}}><InputBase value={props.cartItem.qty} style={{textAlign:'center'}}></InputBase></Button>
          <Button onClick={onIncrementCartItem}>+</Button>
        </ButtonGroup>
      <Divider />
    </React.Fragment>
  );
}