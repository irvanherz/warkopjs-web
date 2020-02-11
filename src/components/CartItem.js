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
import { TextField, withStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  plusminus: {
    maxWidth: '150px',
    "& *" : {
      padding: '0 !important',
      margin: 0
    },
    "& input": {
      textAlign:'center'
    }
  },
}));

export default function CartItem(props) {
  const classes = useStyles();

  function onDelete(){
    props.cartAction.removeItem(props.target.id)
  }

  function onDecrement(){
    props.cartAction.decreaseItem(props.target.id)
  }

  function onIncrement(){
    props.cartAction.increaseItem(props.target.id)
  }

  return (
    <React.Fragment>
      <ListItem dense button style={{flexWrap:'wrap'}}>

        <ListItemAvatar>
            <StyledBadge badgeContent={props.target.qty} color="secondary">
              <Avatar><WorkIcon /></Avatar>
            </StyledBadge>
        </ListItemAvatar>
        <ListItemText primary={currencyFormatter.format(props.target.price,{code:'IDR'})} secondary={props.target.name} />
          <IconButton edge="end" aria-label="delete" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>

        <div style={{flexBasis:'100%', textAlign:'center'}}>
          <ButtonGroup size="small" className={classes.plusminus} aria-label="small outlined button group" >
            <Button size='small' onClick={onDecrement}>-</Button>
            <Button size='small'>
              <InputBase value={props.target.qty} style={{textAlign:'center'}} />
            </Button>
            <Button size='small' onClick={onIncrement}>+</Button>
          </ButtonGroup>
        </div>
        
      </ListItem>
      <Divider />
    </React.Fragment>
  );
}