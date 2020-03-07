import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import IconButton from '@material-ui/core/IconButton'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Avatar from '@material-ui/core/Avatar'
import { List, Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, DialogActions } from '@material-ui/core'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Axios from 'axios'

export default function ProfileMenu(props) {
    const [editDialog, setEditDialog] = React.useState(false)
    const [formData, setFormData] = React.useState({})

    function handleChangeData(field, value) {
        setFormData({...formData, [field]:value})
    }

    function handleSave(){
        if(formData){
            console.log('aaaa', props)
            const myId = props.authData.data.id
            const myToken = props.authData.data.token
            const putData = new FormData()
            Object.keys(formData).forEach(field => {
                putData.set(field, formData[field])
            })
            Axios.put(`${process.env.REACT_APP_API_HOST}/users/${myId}`, putData, {headers:{Authorization: myToken} })
                .then(
                    result => {
                        if(result.status === 200){
                            props.enqueueSnackbar('Update success!', {variant: 'success'})
                            props.authAction.updateLoginData(result.data.data)
                            setEditDialog(false)
                        }
                    }, 
                    error => {
                        if(!error.response){
                            props.enqueueSnackbar('Connection error!', {variant: 'error'})
                        } else {
                            if(error.response.data.errors){
                                error.response.data.errors.forEach( e => {
                                    props.enqueueSnackbar(e.message, {variant: 'error'})
                                })
                            }
                        }
                    }
                )
        }
      
    }

    function onSignout() {
        props.authAction.unsetLoginData()
        props.history.push('/')
    }

    return (
        <>
            <PopupState variant="popover" popupId="demo-popup-popover">
                {popupState => (
                    <div>
                        <IconButton aria-label="cart" color="inherit" edge="end"  {...bindTrigger(popupState)}>
                            <AccountCircleIcon />
                        </IconButton>
                        <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Box p={1} style={{minWidth:'200px'}}>
                                <Avatar style={{margin:'auto'}} ><AccountCircleIcon /></Avatar>
                                <List>
                                    <ListItem dense button>
                                        <ListItemText primary='Edit Profile' onClick={() => setEditDialog(true)}/>
                                    </ListItem>
                                    <ListItem dense button>
                                        <ListItemText primary='Sign out' onClick={onSignout} />
                                    </ListItem>
                                </List>
                            </Box>
                        </Popover>
                    </div>
                )}
            </PopupState>{/* Edit dialog */ }
            <Dialog onClose={() => setEditDialog(false)} open={editDialog} fullWidth maxWidth='sm'>
                <DialogTitle onClose={() => setEditDialog(false)}>Edit User</DialogTitle>
                <DialogContent dividers>
                    <TextField onChange={e => handleChangeData('name', e.target.value)} defaultValue={props.authData.data.name} fullWidth variant="outlined" size="small" placeholder='John Doe' style={{ margin: 8 }} InputLabelProps={{ shrink: true }} label="Fullname" />
                    <TextField onChange={e => handleChangeData('username', e.target.value)} defaultValue={props.authData.data.username} fullWidth variant="outlined" size="small" placeholder='john_doe' style={{ margin: 8 }} InputLabelProps={{ shrink: true }} label="Username" />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => handleSave()} color="primary">Save changes</Button>
                    <Button autoFocus onClick={() => setEditDialog(false)} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}