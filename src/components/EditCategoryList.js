import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import EditCategoryItem from './EditCategoryItem'
import Fab from '@material-ui/core/Fab';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Axios from 'axios'

import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    }
  }));

export default function EditCategoryList(props){
    const classes = useStyles()
    const [openDialog, setOpenDialog] = React.useState(false)
    const [postData, setPostData] = React.useState({})

    function reloadList(params={}){
        Axios.get('http://127.0.0.1:3001/categories', {headers:{'Authorization': props.authData.data.token}, params:params } )
            .then(response => {
                if (response.status === 200) {
                    props.categoryAction.setData(response.data.data)
                }
            }).catch(error => {
                if (!error.response) {
                    props.enqueueSnackbar('Connection error!', { variant: 'error' })
                } else {
                    if (error.response.data.errors) {
                        error.response.data.errors.forEach(e => {
                            props.enqueueSnackbar(e.message, { variant: 'error' })
                        })
                    } else {
                        props.enqueueSnackbar('Unknown server error!', { variant: 'error' })
                    }
                }
            })
    }
    
    function onChangeData(field, value) {
        const newPostData = { ...postData }
        newPostData[field] = value
        setPostData(newPostData)
    }

    function onAddCategory() {
        const payload=postData
        Axios.post('http://127.0.0.1:3001/categories', payload, {headers:{'Authorization': props.authData.data.token} } )
            .then(response => {
                if (response.status === 200) {
                    props.enqueueSnackbar('Category successfully added to database.', { variant: 'success' })
                    setOpenDialog(false)
                    reloadList()
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
            <List>
                {props.categoryData.items.map(category => <EditCategoryItem target={category} {...props} /> )}
            </List>
            <Fab  onClick={e => setOpenDialog(true)} aria-label='Add' className={classes.fab} color='secondary' >
                <AddIcon />
            </Fab>

            {/* Add category dialog */}
            <Dialog onClose={e => setOpenDialog(false)} open={openDialog} fullWidth maxWidth='sm'>
                <DialogTitle onClose={e => setOpenDialog(false)}>
                    Add Category
                </DialogTitle>
                <DialogContent dividers>
                    <div>
                        <TextField onChange={e => onChangeData('name', e.target.value)} fullWidth variant="outlined" size="small" placeholder='Snacks' style={{ margin: 8 }} InputLabelProps={{ shrink: true }} label="Category name" />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={e => onAddCategory()} color="primary">
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

