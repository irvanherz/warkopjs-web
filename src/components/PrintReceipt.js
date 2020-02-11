import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import ReactToPrint from 'react-to-print';
import Axios from 'axios'

const useStyles = makeStyles(theme => ({
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }));

export default function PrintReceipt(props) {
    const receiptRef = React.useRef();
    const [showDialog, setShowDialog] = React.useState(false)
    const classes = useStyles();

      return (
        <React.Fragment>
            <Button variant="contained" color="secondary" onClick={e => setShowDialog(true)} className={classes.button} >Print</Button>
            <Dialog fullWidth onClose={e => setShowDialog(false)} open={showDialog}>
                <DialogTitle onClose={e => setShowDialog(false)}>
                    Checkout
                </DialogTitle>
                <DialogContent dividers ref={receiptRef}>
                    <List disablePadding>
                        {props.cartData.orderData.orderItems.map(item =>
                            <ListItem dense>
                                <ListItemText primary={item.product.name + ' x ' + item.qty} secondary={'@ Rp ' + item.product.price} />
                                <Typography variant="body2">Rp {item.price}</Typography>
                            </ListItem>
                        )}
                        
                    </List>
                </DialogContent>
                <DialogActions>
                    <ReactToPrint
                        trigger={() => <Button>Print</Button>}
                        content={() => receiptRef.current}
                    />
                </DialogActions>
            </Dialog>
        </React.Fragment>
      );
}