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

function AddCategoryButton(props) {
    const [openDialog, setOpenDialog] = React.useState(false)
    const [postData, setPostData] = React.useState({})

    function onChangeData(field, value) {
        const newPostData = { ...postData }
        newPostData[field] = value
        setPostData(newPostData)
    }

    function onAdd() {
        const payload=postData
        Axios.post('http://127.0.0.1:3001/categories', payload, {headers:{Authorization: props.authData.data.token} })
            .then(response => {
                if (response.status === 200) {
                    props.enqueueSnackbar('Category successfully added to database.', { variant: 'success' })
                    setOpenDialog(false)
                    props.categoryAction.reload()
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
            <Button onClick={e => setOpenDialog(true)} variant="contained" color="primary" edge='end' fullWidth style={{ marginBottom: '8px' }}>
                Add category
            </Button>

            <Dialog onClose={e => setOpenDialog(false)} open={openDialog} maxWidth='xs'>
                <DialogTitle onClose={e => setOpenDialog(false)}>
                    Add Category
                </DialogTitle>
                <DialogContent dividers>
                    <div>
                        <TextField onChange={e => onChangeData('name', e.target.value)} fullWidth variant="outlined" size="small" placeholder='Coffee' style={{ margin: 8 }} InputLabelProps={{ shrink: true }} label="Product name" />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={e => onAdd()} color="primary">
                        Save changes
                    </Button>
                    <Button autoFocus onClick={e => setOpenDialog(false)} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default AddCategoryButton