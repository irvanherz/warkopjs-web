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
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StarsIcon from '@material-ui/icons/Stars';

import Button from '@material-ui/core/Button';
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
import Axios from 'axios';


const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(1),
        display: 'inline-block'
    },
    media: {
        width: "100%",
        height: "auto",
    },
    overlay: {
        color: "#FFF",
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%",
        textAlign: "center",
        background: "rgba(0,0,0,0.6)"
    },
    overlayContent: {
        top: "50%",
        transform: "translateY(-50%)",
        position: "relative"
    }
}));

export default function EditCategoryItem(props) {
    const [deleteDialog, setDeleteDialog] = React.useState(false)
    const [editDialog, setEditDialog] = React.useState(false)
    const [editedData, setEditedData] = React.useState({})

    function reloadList(params={}){
        Axios.get(`${process.env.REACT_APP_API_HOST}/categories`, {headers:{'Authorization': props.authData.data.token}, params:params } )
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
    
    function onChangeData(field, value){
        const newEditedData = {...editedData}
        newEditedData[field] = value
        setEditedData(newEditedData)
    }

    function onEditCategory(){
        Axios.put(`${process.env.REACT_APP_API_HOST}/categories/` + props.target.id, editedData, {headers:{'Authorization': props.authData.data.token} } )
          .then(response => {
            if (response.status === 200) {
                props.enqueueSnackbar('User successfully modified', { variant: 'success' })
                setEditDialog(false)
                reloadList()
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

    function onDelete(){
        Axios.delete(`${process.env.REACT_APP_API_HOST}/categories/` + props.target.id, {headers:{'Authorization': props.authData.data.token} } )
        .then(response => {
        if (response.status === 200) {
            props.enqueueSnackbar('Category succesfully deleted.', { variant: 'success' })
            setDeleteDialog(false)
            reloadList()
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
    return (
        <React.Fragment>
                <ListItem dense button fullWidth>
                    <ListItemAvatar>
                        <Avatar><StarsIcon /></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={props.target.name} />
                    <ListItemSecondaryAction>
                        <IconButton onClick={e => {setEditDialog(true)} } edge="end" aria-label="delete">
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={e => {setDeleteDialog(true)} } edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>

            {/* Delete confirmation dialog */}
            <Dialog onClose={e => setDeleteDialog(false)} open={deleteDialog} fullWidth maxWidth='sm'>
                <DialogTitle onClose={e => setDeleteDialog(false)}>
                    Delete Category
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
                    <Button autoFocus onClick={e => setDeleteDialog(false)} color="primary">
                    Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit dialog */}
            <Dialog onClose={e => setEditDialog(false)} open={editDialog} fullWidth maxWidth='sm'>
                <DialogTitle onClose={e => setEditDialog(false)}>
                   Edit Category
                </DialogTitle>
                <DialogContent dividers>
                    <div>
                        <TextField onChange={e => onChangeData('name', e.target.value)} defaultValue={props.target.name} fullWidth variant="outlined" size="small" placeholder='Snacks' style={{ margin: 8 }} InputLabelProps={{ shrink: true }} label="Category name" />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={e => onEditCategory()} color="primary">
                        Save changes
                    </Button>
                    <Button autoFocus onClick={e => setEditDialog(false)} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

        </React.Fragment>
    )
}
