

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import CheckoutPayment from './CheckoutPayment'
import CheckoutReview from './CheckoutReview'
import CheckoutReceipt from './CheckoutReceipt'
import Axios from 'axios';

import PrintReceipt from './PrintReceipt';

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

export default function CheckoutDialog(props) {
  const classes = useStyles();
  const [checkoutDialog, setCheckoutDialog] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [checkoutData, setCheckoutData] = React.useState({});

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handlePlaceOrder = () => {
    const payload = {orderItems:[]}
    payload.orderItems = props.cartData.items.map(item => ({product_id: item.id, qty: item.qty}))
    Axios.post('http://127.0.0.1:3001/orders', payload, {headers:{'Authorization': props.authData.data.token} } )
    .then(response => {
      if(response.status === 200){
        props.enqueueSnackbar('Order placed', {variant: 'success'})
        props.cartAction.setOrderData(response.data.data)
        setActiveStep(activeStep + 1);
      } else {
        props.enqueueSnackbar('Unknown error', {variant: 'error'})
      }
    })
    .catch(error => {
      if(!error.response){
        props.enqueueSnackbar('Connection error!', {variant: 'error'})
      } else {
        if(error.response.data.errors){
          error.response.data.errors.forEach( e => {
            props.enqueueSnackbar(e.message, {variant: 'error'})
          })
        } else {
          props.enqueueSnackbar('Unknown server error', {variant: 'error'})
        }
      }
    })
  }

  function handlePrint(){

  }

  const handleFinish = () => {
    //props.cartAction.clearItems()
    setActiveStep(activeStep + 1);
  };

  const steps = ['Review order', 'Payment', 'Receipt'];

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <CheckoutReview {...props} checkoutData={checkoutData} setCheckoutData={setCheckoutData} />
      case 1:
        return <CheckoutPayment {...props} checkoutData={checkoutData} setCheckoutData={setCheckoutData}/>
      case 2:
        return <CheckoutReceipt {...props} checkoutData={checkoutData} setCheckoutData={setCheckoutData} />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <React.Fragment>
      <Button onClick={e => {setCheckoutDialog(true); setActiveStep(0)} } variant="contained" color="primary" edge='end' fullWidth style={{ marginBottom: '8px' }}>
        Checkout
      </Button>
      <Button onClick={e => props.cartAction.clearItems() } variant="contained" color="secondary" edge='end' fullWidth>
        Clear
      </Button>
     <Dialog fullWidth className={classes.paper} onClose={e => setCheckoutDialog(false)} open={checkoutDialog}>
        <DialogTitle id="customized-dialog-title" onClose={e => setCheckoutDialog(false)}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Selamat datang kembali :)
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {(activeStep === 0 || activeStep === 1 || activeStep === 3) && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {activeStep === 0 ? (
                    <Button variant="contained" color="primary" onClick={handleNext} className={classes.button} >Next</Button>
                  ) : (
                    activeStep === 1 ? (
                      <Button variant="contained" color="primary" onClick={handlePlaceOrder} className={classes.button} >Place Order</Button>
                    ) : (
                      <React.Fragment>
                        <Button variant="contained" color="secondary" className={classes.button} >Send Email</Button>
                        {/* <Button variant="contained" color="secondary" onClick={handlePrint} className={classes.button} >Print</Button> */}
                        <PrintReceipt {...props} />
                        <Button variant="contained" color="primary" onClick={handleFinish} className={classes.button} >Finish</Button>
                      </React.Fragment>
                    )
                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
      </DialogContent>
    </Dialog>
    </React.Fragment>
  );
}