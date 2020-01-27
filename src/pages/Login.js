import React, { useCallback } from "react";

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

export default function Login(props) {
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [snackbarShow, setSnackbarShow] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("Message");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

  const handleSubmit = (event) => {
    event.preventDefault()
    setSnackbarShow(false);
    Axios.post('http://127.0.0.1:3001/auth/signin', {username, password})
    .then(result => {
        if(result.status === 200){
            setSnackbarSeverity('success')
            setSnackbarMessage('Login success!')
        } else {
            setSnackbarSeverity('error')
            setSnackbarMessage('Ooops, unknown error!')
        } 
    }).catch(error => {
        if(!error.response){
            setSnackbarSeverity('error')
            setSnackbarMessage('Connection error!')
        } else {
            setSnackbarSeverity('error')
            setSnackbarMessage('Login error!')
        }
    })
    setSnackbarShow(true)
  }

  const handleSnackbarClose = (event, reason) =>{
    if (reason === 'clickaway') {
          return;
        }
        setSnackbarShow(false);
  }
    const classes = useStyles();
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
        <Snackbar open={snackbarShow} autoHideDuration={5000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} elevation={6} variant="filled">{snackbarMessage}</Alert>
        </Snackbar>
      </Container>
    )
}
