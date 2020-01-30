import React from 'react';
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
import ReactCrop from 'react-image-crop';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';


function ProductDetailDialog(props) {
  return (
    <React.Fragment>
      <Dialog
        open={props.state}
        onClose={e => props.setState(false)}
      >
        <DialogTitle id="alert-dialog-title">Add a product</DialogTitle>
        dddd
      </Dialog>
    </React.Fragment>
  );
}

export default withSnackbar(ProductDetailDialog)