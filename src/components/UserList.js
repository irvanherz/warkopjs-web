import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import StyledBadge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import WorkIcon from '@material-ui/icons/Work';
import IconButton from '@material-ui/core/IconButton';

import Button from '@material-ui/core/Button';
import CartItem from './CartItem';
import CheckoutDialog from './CheckoutDialog';
import axios from 'axios'
import { withSnackbar } from 'notistack';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Axios from 'axios';

import UserItem from './UserItem'

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}))

function UserList(props) {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = React.useState(false)
    const [postData, setPostData] = React.useState({})

    function reloadList(params={}){
        Axios.get('http://127.0.0.1:3001/users', {headers:{'Authorization': props.authData.data.token}, params:params } )
            .then(response => {
                if (response.status === 200) {
                    props.userAction.setData(response.data.data)
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

    function onAddUser() {
        const payload=postData
        Axios.post('http://127.0.0.1:3001/users', payload, {headers:{'Authorization': props.authData.data.token} } )
            .then(response => {
                if (response.status === 200) {
                    props.enqueueSnackbar('User added to database.', { variant: 'success' })
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
                    } else {
                        props.enqueueSnackbar('Unknown server error!', { variant: 'error' })
                    }
                }
            })
    }
    return (
        <React.Fragment>
            {/* List */}
            <List>
                {props.userData.items.map((item) => (
                    <UserItem target={item} {...props} />
                ))}
            </List>
            <Fab onClick={e => setOpenDialog(true)} aria-label='Add' className={classes.fab} color='secondary' >
                <AddIcon />
            </Fab>
        
            {/* Add user dialog */}
            <Dialog onClose={e => setOpenDialog(false)} open={openDialog} maxWidth='xs'>
                <DialogTitle onClose={e => setOpenDialog(false)}>
                    Add User
                </DialogTitle>
                <DialogContent dividers>
                    <div>
                        <TextField onChange={e => onChangeData('name', e.target.value)} fullWidth variant="outlined" size="small" placeholder='John Doe' style={{ margin: 8 }} InputLabelProps={{ shrink: true }} label="Fullname" />
                        <TextField onChange={e => onChangeData('username', e.target.value)} fullWidth variant="outlined" size="small" placeholder='john_doe' style={{ margin: 8 }} InputLabelProps={{ shrink: true }} label="Username" />
                        <TextField onChange={e => onChangeData('password_1', e.target.value)} fullWidth variant="outlined" size="small" placeholder='Password' style={{ margin: 8 }} InputLabelProps={{ shrink: true }} type='password' label="Password" />
                        <TextField onChange={e => onChangeData('password_2', e.target.value)} fullWidth variant="outlined" size="small" placeholder='Retype your password' style={{ margin: 8 }} InputLabelProps={{ shrink: true }} type='password' label="Retype your password" />
                        <FormControl fullWidth style={{ margin: 8 }}>
                            <InputLabel shrink variant='outlined' margin='dense'>Role</InputLabel>
                            <Select onChange={e => onChangeData('role', e.target.value)} defaultValue='' fullWidth variant="outlined" margin='dense' input={<OutlinedInput notched labelWidth={64} />} >
                                <MenuItem value=''></MenuItem>
                                <MenuItem value={0}>Administrator</MenuItem>
                                <MenuItem value={1}>Cashier</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={e => onAddUser()} color="primary">
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

export default UserList