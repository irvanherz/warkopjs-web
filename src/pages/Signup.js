import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import {Link} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup(props) {
  if(props.authData.data.id) props.history.push('/home')

  const [postData, setPostData] = React.useState({})
  const classes = useStyles();

  function onChangeData(field, value) {
    const newPostData = { ...postData }
    newPostData[field] = value
    setPostData(newPostData)
  }

  function onSubmit(event){
    event.preventDefault()
    setPostData({...postData, role:1})
    
    Axios.post('http://127.0.0.1:3001/auth/signup', postData)
            .then(response => {
                if (response.status === 200) {
                    props.enqueueSnackbar('Account registration success. But you must wait administrator to verify your account before you can login.', { variant: 'success' })
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography> */}
        <img src='/login_logo.png' />
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={e => onChangeData('name', e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Fullname"
                name="name"
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => onChangeData('username', e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => onChangeData('password_1', e.target.value)}
                variant="outlined"
                required
                fullWidth
                name="password_1"
                label="Password"
                type="password"
                id="password_1"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => onChangeData('password_2', e.target.value)}
                variant="outlined"
                required
                fullWidth
                name="password_2"
                label="Retype your password"
                type="password"
                id="password2_2"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I'm agree to all Terms and Condition"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}