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
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import currencyFormatter  from 'currency-formatter';
import axios from 'axios'
import {withSnackbar} from 'notistack'
import Axios from 'axios';


export default function CartItem(props) {
    const [editDialog, setEditDialog] = React.useState(false)
    const [deleteDialog, setDeleteDialog] = React.useState(false)
    const [editData, setEditData] = React.useState({})

    function onChangeData(field, value){
      const newEditData = {...editData}
      newEditData[field] = value
      setEditData(newEditData)
    }

    function onEdit() {
      Axios.put(`${process.env.REACT_APP_API_HOST}/categories/` + props.target.id, editData, {headers:{'Authorization': props.authData.data.token} })
        .then(response => {
            if (response.status === 200) {
                props.enqueueSnackbar('Category successfully modified', { variant: 'success' })
                setEditDialog(false)
                props.categoryAction.reload()
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

    function onDelete() {
      Axios.delete(`${process.env.REACT_APP_API_HOST}/categories/` + props.target.id, {headers:{'Authorization': props.authData.data.token} } )
        .then(response => {
        if (response.status === 200) {
            props.enqueueSnackbar('Category succesfully deleted.', { variant: 'success' })
            setDeleteDialog(false)
            props.categoryAction.reload()
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

  return (
    <React.Fragment>
      <ListItem dense button>
        <ListItemAvatar>
            <Avatar>C</Avatar>
        </ListItemAvatar>
        <ListItemText primary={props.target.name} />
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={e => setEditDialog(true)} >
            <EditIcon />
          </IconButton>
          <IconButton edge="end" onClick={e => setDeleteDialog(true)} >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />

      {/* Edit category dialog */}
      <Dialog onClose={e => setEditDialog(false)} open={editDialog} fullWidth maxWidth='sm'>
        <DialogTitle onClose={e => setEditDialog(false)}>
            Edit Category
        </DialogTitle>
        <DialogContent dividers>
            <div>
                <TextField onChange={e => onChangeData('name', e.target.value)} defaultValue={props.target.name} fullWidth variant="outlined" size="small" placeholder='Snack' style={{ margin: 8 }} InputLabelProps={{ shrink: true }} label="Category name" />
            </div>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={e => onEdit()} color="primary">
                Save changes
            </Button>
            <Button autoFocus onClick={e => setEditDialog(false)} color="primary">
                Cancel
            </Button>
        </DialogActions>
      </Dialog>

      {/* Delete category dialog */}
      <Dialog onClose={e => setDeleteDialog(false)} open={deleteDialog} fullWidth maxWidth='sm'>
        <DialogTitle onClose={e => setDeleteDialog(false)}>
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
          <Button autoFocus onClick={e => setDeleteDialog(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  );
}