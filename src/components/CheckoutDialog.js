import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import currencyFormatter  from 'currency-formatter';
import axios from 'axios'
import {withSnackbar} from 'notistack'

class ComponentToPrint extends React.Component {
  render() {
    return (
      <table>
        <thead>
          <th>column 1</th>
          <th>column 2</th>
          <th>column 3</th>
        </thead>
        <tbody>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
          <tr>
            <td>data 1</td>
            <td>data 2</td>
            <td>data 3</td>
          </tr>
        </tbody>
      </table>
    );
  }
}

function CheckoutDialog(props) {
  const cashierName = JSON.parse(localStorage.getItem('loginData')).name
  return (
    <div>
      <Dialog disableBackdropClick disableEscapeKeyDown fullWidth maxWidth='sm' open={props.state} >
        <DialogTitle id="form-dialog-title">Checkout</DialogTitle>
        <DialogContent>
          <List dense>
          <ListItem>Cashier: {cashierName}</ListItem>
          <ListItem>Receipt no: #{props.orderResponseData.invoice_id}</ListItem>
          <Divider />
          {
            props.orderResponseData.orderItems && props.orderResponseData.orderItems.map(item => 
              <React.Fragment>
              <ListItem key={item.product.name} button>
              <ListItemText id={item.product.id} primary={`${item.product.name} x${item.qty}`} secondary={`@${currencyFormatter.format(item.product.price,{code:'IDR'})}`} />
                <ListItemSecondaryAction>
                {currencyFormatter.format(item.price,{code:'IDR'})}
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              </React.Fragment>
            )
          }
          </List>
        </DialogContent>
        <DialogActions>
          <Button color="primary">
            Send Email
          </Button>
          <Button color="primary">
            Print
          </Button>
          <Button onClick={e => props.setState(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withSnackbar(CheckoutDialog)