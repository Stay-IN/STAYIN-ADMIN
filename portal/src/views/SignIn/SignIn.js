import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { AuthServices } from 'Services';
import { Snackbar } from 'components';
import axios from 'axios';
import Config from 'Config';
const schema = {
  username: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage:
      'url(https://imgcy.trivago.com/c_limit,d_dummy.jpeg,f_auto,h_1300,q_auto,w_2000/itemimages/99/48/99481_v10.jpeg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignIn = props => {
  const { history } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [Forgat, setForgat] = useState({
    Fusername: '',
    isOpen: false,
    message: '',
    variant: 'error'
  });
  const [pass, setpass] = useState({
    Fpassword: ''
  });
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleBack = () => {
    history.goBack();
  };

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignIn = async event => {
    event.preventDefault();
    const { username, password } = formState.values;
    const response = await AuthServices.managerlogin(username, password);
    if (!response.success) {
      const message = response.data.message;
      setForgat({
        message: message[0],
        isOpen: true,
        variant: 'error'
      });
    } else {
      const id = response.data.id;
      history.push(`/hotels/${id}`);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose1 = () => {
    setOpen(false);
  };

  const handleClose = async () => {
    const username = Forgat.Fusername;
    const password = pass.Fpassword;
    try {
      const response = await axios.post(`${Config.SERVER_URL}/manager`, {
        username,
        password
      });
      const message = response.data.data.message;
      setForgat({
        message: message[0],
        isOpen: true,
        variant: 'error',
        Fusername: ''
      });
      setpass({
        Fpassword: ''
      });
      setOpen(false);
    } catch (error) {
      setForgat({
        message: 'User does not exist',
        isOpen: true,
        variant: 'error',
        Fusername: ''
      });
      setpass({
        Fpassword: ''
      });
    }
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Snackbar
        errorMessage={Forgat.message}
        isOpen={Forgat.isOpen}
        handleClose={() => setForgat({ isOpen: false })}
        variant={Forgat.variant}
      />
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography className={classes.quoteText} variant="h1">
                Welcome to StayIn-Admin
              </Typography>
              <div className={classes.person}>
                <Typography className={classes.name} variant="body1">
                  STAY-IN
                </Typography>
                <Typography className={classes.bio} variant="body2">
                  Manager at inVision
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSignIn}>
                <Typography className={classes.title} variant="h2">
                  Sign in
                </Typography>

                <Typography color="textSecondary" gutterBottom>
                  Sign in with Stayin-Admin
                </Typography>

                <Typography
                  align="center"
                  className={classes.sugestion}
                  color="textSecondary"
                  variant="body1"
                >
                  login with email address
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('username')}
                  fullWidth
                  helperText={
                    hasError('username') ? formState.errors.username[0] : null
                  }
                  label="Email address"
                  name="username"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.username || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                />
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">
                    Forgot your password ?
                  </DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      variant="outlined"
                      id="Fusername"
                      name="Fusername"
                      placeholder="Email Address"
                      type="email"
                      fullWidth
                      value={Forgat.Fusername}
                      onChange={e => setForgat({ Fusername: e.target.value })}
                    />
                  </DialogContent>
                  <DialogContent>
                    <TextField
                      variant="outlined"
                      name="Fpassword"
                      id="Fpassword"
                      margin="dense"
                      placeholder="New password"
                      type="password"
                      fullWidth
                      value={pass.Fpassword}
                      onChange={e => setpass({ Fpassword: e.target.value })}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose1} color="primary">
                      Close
                    </Button>
                    <Button onClick={handleClose} color="primary">
                      Change
                    </Button>
                  </DialogActions>
                </Dialog>
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign in now
                </Button>
                <Typography color="textSecondary" variant="body1">
                  Don't have an account?{' '}
                  <Link component={RouterLink} to="/sign-up" variant="h6">
                    Sign up
                  </Link>
                </Typography>
                <Typography color="textSecondary" variant="body1">
                  <Button
                    className={classes.signInButton}
                    color="primary"
                    onClick={handleClickOpen}
                    variant="contained"
                  >
                    Forgot password
                  </Button>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
