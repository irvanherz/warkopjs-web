import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import EditProductCard from './EditProductCard'
import Pagination from './Pagination'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Axios from 'axios'

const useStyles = makeStyles(theme => ({
    productListContainer: {
        flexGrow: 1,
        columns: '250px',
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}))

export default function EditProductList(props){
    const classes = useStyles();
    const [openDialog, setOpenDialog] = React.useState(false)
    const [postData, setPostData] = React.useState({})

    function reloadProducts(params) {
        Axios.get('http://127.0.0.1:3001/products', { headers: { 'Authorization': props.authData.data.token }, params: params })
            .then(response => {
                if (response.status === 200) {
                    props.productAction.setData(response.data.data)
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
                    } else {
                        props.enqueueSnackbar('Unknown server error', { variant: 'error' })
                    }
                }
            })
    }

    function onChangeData(field, value) {
        const newPostData = { ...postData }
        newPostData[field] = value
        setPostData(newPostData)
    }

    function onAddProduct() {
        const payload=postData
        Axios.post('http://127.0.0.1:3001/products', payload, {headers:{'Authorization': props.authData.data.token} })
            .then(response => {
                if (response.status === 200) {
                    props.enqueueSnackbar('Product order successfully added to database.', { variant: 'success' })
                    setOpenDialog(false)
                    reloadProducts(props.productData.params)
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

    return(
        <React.Fragment>
            <Box className={classes.productListContainer}>
                {props.productData.items.map(product => <EditProductCard key={product.name} target={product} {...props} /> )}
            </Box>
            <Fab onClick={e => setOpenDialog(true)} aria-label='Add' className={classes.fab} color='secondary' >
                <AddIcon />
            </Fab>

             {/* Add product dialog */}
            <Dialog onClose={e => setOpenDialog(false)} open={openDialog} maxWidth='xs'>
                <DialogTitle onClose={e => setOpenDialog(false)}>
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
                    <Button autoFocus onClick={e => onAddProduct()} color="primary">
                        Save changes
                    </Button>
                    <Button autoFocus onClick={e => setOpenDialog(false)} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
    
}

