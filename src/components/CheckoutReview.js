import React from 'react'
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

export default function CheckoutReview(props) {
    let total = props.cartData.items.reduce((acc,item) => {
      return acc + item.price * item.qty
    }, 0)
    return (
      <React.Fragment>
        <List disablePadding>
          {props.cartData.items.map(item => (
            <ListItem dense>
              <ListItemText primary={item.name} secondary={item.qty + ' x Rp ' + item.price} />
              <Typography variant="body2">{item.qty * item.price}</Typography>
            </ListItem>
          ))}
          <ListItem dense>
            <ListItemText primary='Tax' secondary='10%' />
            <Typography variant="body2">{total * 0.1}</Typography>
          </ListItem>
          <ListItem dense>
            <ListItemText primary='Total' />
            <Typography variant="body2">{total + total * 0.1}</Typography>
          </ListItem>
        </List>
      </React.Fragment>
    )
}