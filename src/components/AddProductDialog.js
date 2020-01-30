import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios'
import { withSnackbar } from 'notistack';
import { Redirect } from 'react-router-dom'

function AddProductDialog(props) {
  const [categories, setCategories] = React.useState([]);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [image, setImage] = React.useState('');
  const [price, setPrice] = React.useState('');

  React.useEffect(() => {
    axios.get('http://127.0.0.1:3001/categories')
    .then(result => {
        setCategories(result.data.data.items)
    })
  }, [])


  const handleClose = () => {
    props.setState(false);
  };

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0])
    }
  };

  const handleSubmit = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('category_id', category)
    formData.append('image', image)
    formData.append('price', price)
    axios.post('http://localhost:3001/products', formData, {headers: {'content-type': 'multipart/form-data'}})
    .then(result => {
      if(result.status === 200){
          props.enqueueSnackbar('Product was added.', {variant: 'success'})
          props.setState(false)
          return (<Redirect push to='/login' />)
      }
    }).catch(error => {
      if(!error.response){
        props.enqueueSnackbar('Connection error!', {variant: 'error'})
      } else {
        if(error.response.data.errors){
          error.response.data.errors.forEach( e => {
            props.enqueueSnackbar(e.message, {variant: 'error'})
          })
        }
      }
    });
  };
  
  return (
    <React.Fragment>
      <Dialog disableBackdropClick disableEscapeKeyDown
        open={props.state}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add a product</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Define product properties below.
            <TextField required label="Product name" fullWidth onChange={e => setName(e.target.value)} />
            
            <FormControl fullWidth>
              <InputLabel shrink id="demo-simple-select-placeholder-label-label">Category</InputLabel>
              <Select required labelId="demo-simple-select-placeholder-label-label" id="demo-simple-select-placeholder-label" onChange={e => setCategory(e.target.value)} value={category} displayEmpty fullWidth>
                <MenuItem value=""><em>None</em></MenuItem>
                {categories.map(category => <MenuItem value={category.id}>{category.name}</MenuItem>)}
              </Select>
            </FormControl>
            <TextField required id="standard-required" label="Description" fullWidth onChange={e => setDescription(e.target.value)} />
            <TextField required id="standard-required" label="Price" fullWidth onChange={e => setPrice(e.target.value)} />
            <FormControl fullWidth>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">Image</InputLabel>
              <Input required id="standard-required" label="Image" fullWidth type="file" accept="image/*" onChange={onSelectFile} defaultValue="" />
            </FormControl>
          </DialogContentText>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default withSnackbar(AddProductDialog)