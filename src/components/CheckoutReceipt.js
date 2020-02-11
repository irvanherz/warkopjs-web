import React from 'react'
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import ReactToPrint from 'react-to-print';
import Axios from 'axios'
import PrintReceipt from './PrintReceipt';

export default function CheckoutReview(props) {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
            Order {props.cartData.orderData.invoice_id} placed.
        </Typography>
        <Typography variant="body2" gutterBottom>
            Please select wether you want to prints receipt or send it to your email.
        </Typography>
      </React.Fragment>
    )
}