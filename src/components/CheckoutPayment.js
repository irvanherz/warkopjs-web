import React from 'react'
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function CheckoutReview(props) {
    const [paymentAmount, setPaymentAmount] = React.useState(0)
    const [tenderAmount, setTenderAmount] = React.useState(0)
    const [changeAmount, setChangeAmount] = React.useState(0)

    function onChangeTenderAmount(e){
        setTenderAmount(e.target.value)
        setChangeAmount(tenderAmount - paymentAmount)
    }

    React.useEffect(() => {
        setChangeAmount(tenderAmount - paymentAmount)
    }, [tenderAmount])

    React.useEffect(() => {
        let total = 0
        props.cartData.items.forEach(item => total += item.qty * item.price)
        total += total * 0.1
        setPaymentAmount(total)
        setTenderAmount(total)
    }, [props.cartData])

    return (
      <React.Fragment>
        <TextField value={paymentAmount} fullWidth variant="outlined" size="small" style={{ margin: 8 }} InputLabelProps={{ shrink: true }} label="Payment amount" />
        <TextField onChange={onChangeTenderAmount} defaultValue={tenderAmount} fullWidth variant="outlined" size="small" style={{ margin: 8 }} InputLabelProps={{ shrink: true }} label="Tender amount" />
        <TextField value={changeAmount} fullWidth variant="outlined" size="small" style={{ margin: 8 }} InputLabelProps={{ shrink: true }} label="Change" />
      </React.Fragment>
    )
}