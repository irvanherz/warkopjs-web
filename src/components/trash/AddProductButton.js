import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import currencyFormatter from 'currency-formatter';
import axios from 'axios'
import { withSnackbar } from 'notistack'
import Axios from 'axios';

function AddProductButton(props) {
    const [addProductDialog, setAddProductDialog] = React.useState(false)
    const [postData, setPostData] = React.useState({})

    function onChangeData(field, value) {
        const newPostData = { ...postData }
        newPostData[field] = value
        setPostData(newPostData)
    }

    function onAdd() {
        const payload=postData
        Axios.post(`${process.env.REACT_APP_API_HOST}/products`, payload, {headers:{Authorization: props.authData.data.token} })
            .then(response => {
                if (response.status === 200) {
                    props.enqueueSnackbar('Product order successfully added to database.', { variant: 'success' })
                    setAddProductDialog(false)
                    props.productAction.reload(props.productData.params)
                }
            }).catch(error => {
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

    return (
        <React.Fragment>
            <Button onClick={e => setAddProductDialog(true)} variant="contained" color="primary" edge='end' fullWidth style={{ marginBottom: '8px' }}>
                Add product
            </Button>

            <Dialog onClose={e => setAddProductDialog(false)} open={addProductDialog} maxWidth='xs'>
                <DialogTitle onClose={e => setAddProductDialog(false)}>
                    Add Product
                </DialogTitle>
                <DialogContent dividers>
                    <div>
                        <TextField onChange={e => onChangeData('name', e.target.value)} fullWidth variant="outlined" size="small" placeholder='Coffee' style={{ margin: 8 }} InputLabelProps={{ shrink: true }} label="Product name" />
                        <FormControl fullWidth style={{ margin: 8 }}>
                            <InputLabel shrink variant='outlined' margin='dense'>Category</InputLabel>
                            <Select onChange={e => onChangeData('category_id', e.target.value)} fullWidth variant="outlined" margin='dense' input={<OutlinedInput notched labelWidth={64} />} >
                                {props.categoryData.items.map(category => <MenuItem value={category.id}>{category.name}</MenuItem>)}
                            </Select>
                        </FormControl>

                        <TextField onChange={e => onChangeData('description', e.target.value)} fullWidth variant="outlined" size="small" placeholder='Description' style={{ margin: 8 }} InputLabelProps={{ shrink: true }} label="Description" />
                        <TextField onChange={e => onChangeData('price', e.target.value)} fullWidth variant="outlined" size="small" placeholder='10000' style={{ margin: 8 }} InputLabelProps={{ shrink: true }} label="Price" />
                        <FormControl fullWidth style={{ margin: 8 }}>
                            <InputLabel shrink variant='outlined' margin='dense'>Image</InputLabel>
                            <OutlinedInput notched onChange={e => onChangeData('image', e.target.files[0])} label="Image" fullWidth variant="outlined" size="small" margin='dense' type="file" accept="image/*" />
                        </FormControl>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={e => onAdd()} color="primary">
                        Save changes
                    </Button>
                    <Button autoFocus onClick={e => setAddProductDialog(false)} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default AddProductButton