import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import currencyFormatter  from 'currency-formatter';
import axios from 'axios'
import {withSnackbar} from 'notistack'
import Axios from 'axios';

function CheckoutDialog(props) {
  console.log(props)
  const [editProductDialog, setEditProductDialog] = React.useState(false)
  const [deleteProductDialog, setDeleteProductDialog] = React.useState(false)
  const [editData, setEditData] = React.useState({})
  

  function onDelete(id) {
    Axios.delete('http://127.0.0.1:3001/products/' + id, {headers:{'Authorization': props.authData.data.token} } )
    .then(response => {
      if (response.status === 200) {
          props.enqueueSnackbar('Product succesfully deleted.', { variant: 'success' })
          setDeleteProductDialog(false)
          props.productAction.reload(props.productData.params)
      }
    })
    .catch(error => {
        if (!error.response) {
            props.enqueueSnackbar('Connection error!', { variant: 'error' })
        } else {
            if (error.response.data.errors) {
                error.response.data.errors.forEach(e => {
                    props.enqueueSnackbar(e.message, { variant: 'error' })
                })
            }
        }
    })
    
  }

  function onEdit(id) {
    const formData = new FormData()
    Object.keys(editData).forEach(key => {
        formData.append(key, editData[key])  
    })
    Axios.put('http://127.0.0.1:3001/products/' + id, formData, {headers:{'Authorization': props.authData.data.token} })
      .then(response => {
        if (response.status === 200) {
            props.enqueueSnackbar('Product order successfully modified', { variant: 'success' })
            setEditProductDialog(false)
            props.productAction.reload(props.productData.params)
        }
      })
      .catch(error => {
          if (!error.response) {
              props.enqueueSnackbar('Connection error!', { variant: 'error' })
          } else {
              if (error.response.data.errors) {
                  error.response.data.errors.forEach(e => {
                      props.enqueueSnackbar(e.message, { variant: 'error' })
                  })
              }
          }
      })
  }

  function onChangeData(field, value){
      const newEditData = {...editData}
      newEditData[field] = value
      setEditData(newEditData)
  }

  return (
    <React.Fragment>
        <Button onClick={e => setEditProductDialog(true)} variant="contained" color="primary" edge='end' fullWidth style={{ marginBottom: '8px' }}>
            Edit
        </Button>
        <Button onClick={e => setDeleteProductDialog(true)} variant="contained" color="primary" edge='end' fullWidth style={{ marginBottom: '8px' }}>
            Delete
        </Button>

    <Dialog onClose={e => setDeleteProductDialog(false)} open={deleteProductDialog} fullWidth maxWidth='xs'>
        <DialogTitle onClose={e => setDeleteProductDialog(false)}>
          Delete Product
        </DialogTitle>
        <DialogContent dividers>
            <Typography>
                Are you sure?
            </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={e => onDelete(props.target.id)} color="primary">
            Yes
          </Button>
          <Button autoFocus onClick={e => setDeleteProductDialog(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

        <Dialog onClose={e => setEditProductDialog(false)} open={editProductDialog} fullWidth maxWidth='xs'>
        <DialogTitle onClose={e => setEditProductDialog(false)}>
          Edit Product
        </DialogTitle>
        <DialogContent dividers>
            <div>
            <TextField onChange={e => onChangeData('name', e.target.value)} defaultValue={props.target.name} fullWidth variant="outlined" size="small" placeholder='Coffee' style={{ margin: 8 }} InputLabelProps={{ shrink: true }} label="Product name" />
            <FormControl fullWidth style={{ margin: 8 }}>
                <InputLabel shrink variant='outlined' margin='dense'>Category</InputLabel>
                <Select onChange={e => onChangeData('category_id', e.target.value)} defaultValue={props.target.category_id} fullWidth variant="outlined" margin='dense' input={<OutlinedInput notched labelWidth={64} />} >
                    {props.categoryData.items.map(category => <MenuItem value={category.id}>{category.name}</MenuItem>)}
                </Select>
            </FormControl>

            <TextField onChange={e => onChangeData('description', e.target.value)} defaultValue={props.target.description} fullWidth variant="outlined" size="small" placeholder='Description' style={{ margin: 8 }} InputLabelProps={{ shrink: true }} label="Description" />
            <TextField onChange={e => onChangeData('price', e.target.value)} defaultValue={props.target.price} fullWidth variant="outlined" size="small" placeholder='10000' style={{ margin: 8 }} InputLabelProps={{ shrink: true }} label="Price" />
            <FormControl fullWidth style={{ margin: 8 }}>
                <InputLabel shrink variant='outlined' margin='dense'>Image</InputLabel>
                <OutlinedInput notched onChange={e => onChangeData('image', e.target.files[0])} label="Image" fullWidth variant="outlined" size="small" margin='dense' type="file" accept="image/*" />
            </FormControl>
            </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={e => onEdit(props.target.id)} color="primary">
            Save changes
          </Button>
          <Button autoFocus onClick={e => setEditProductDialog(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      </React.Fragment>
  );
}

export default withSnackbar(CheckoutDialog)