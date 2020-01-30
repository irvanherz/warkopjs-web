import React, { useCallback } from "react";
import {Redirect} from 'react-router-dom'
import { withSnackbar } from 'notistack';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container, Snackbar
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert'
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function Login(props) {
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const classes = useStyles();
  //Check login
  const loginData = localStorage.getItem('loginData')
  if(loginData) return(<Redirect push to='/home' />)
  const handleSubmit = (event) => {
    event.preventDefault()
    Axios.post('http://127.0.0.1:3001/auth/signin', {username, password})
    .then(result => {
        if(result.status === 200){
            const loginData = JSON.stringify(result.data.data)
            localStorage.setItem('loginData', loginData)
            props.enqueueSnackbar('Login success!', {variant: 'success'})
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
    })
  }
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <TextField
              onChange={event => setUsername(event.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              helperText="Enter your username"
              autoFocus
            />
            <TextField
              onChange={event => setPassword(event.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              helperText="Enter your password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </Box>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    )
}

export default withSnackbar(Login)