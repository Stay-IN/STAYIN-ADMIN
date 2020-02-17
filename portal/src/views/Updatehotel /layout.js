import React, { Component } from 'react';
import {
  withStyles,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  CircularProgress
} from '@material-ui/core';

import style from './style';
import { Snackbar } from 'components';

import { HotelServices } from 'Services';

class Layout extends Component {
  state = {
    hotelname: '',
    address: '',
    city: '',
    pincode: '',
    mobile: '',
    price: '',
    state: '',
    star: '',
    email: '',
    pancard: '',
    description: '',
    message: '',
    variant: 'error',
    isChecking: false,
    isOpen: false
  };

  handleInput = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = async () => {
    this.setState({ isChecking: true });
    //   Data From The User
    const {
      hotelName,
      address,
      city,
      pincode,
      mobile,
      price,
      state,
      star,
      email,
      pancard,
      description
    } = this.state;

    // Api Code

    const response = await HotelServices.addHotel({
      hotelName,
      address,
      city,
      pincode,
      mobile,
      price,
      state,
      star,
      email,
      pancard,
      description
    });
    if (!response.success) {
      const message = response.data.message;
      this.setState({
        message: message[0],
        isOpen: true,
        variant: 'error'
      });
    } else {
      this.props.history.push('/hotels');
    }
    // Clear The State
    this.setState({
      address: '',
      city: '',
      pincode: '',
      mobile: '',
      price: '',
      state: '',
      star: '',
      email: '',
      pancard: '',
      description: '',
      isAdded: true,
      isChecking: false
    });
  };

  async componentDidMount() {
    const id = this.props.match.params.id;
    const response = await HotelServices.getHotelById(id);
    const hotelData = response.data.hotels;
    const {
      hotelName,
      city,
      pincode,
      mobile,
      price,
      state,
      star,
      pancard,
      description,
      address,
      email
    } = hotelData;
    if (response.success) {
      this.setState({
        hotelName,
        address,
        city,
        pincode,
        mobile,
        price,
        state,
        star,
        email,
        pancard,
        description
      });
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Snackbar
          errorMessage={this.state.message}
          isOpen={this.state.isOpen}
          handleClose={() => this.setState({ isOpen: false })}
          variant={this.state.variant}
        />

        <Container maxWidth="md" style={{ height: '95vh' }}>
          <Grid container spacing={3} className={classes.container}>
            <Grid item xs={12} md={12} lg={12}>
              <Typography
                variant="h5"
                color="defulat"
                style={{ marginTop: '2rem' }}
              >
                Update your Hotel
              </Typography>
              <TextField
                name="hotelname"
                id="hotelName"
                className={classes.textField}
                variant="outlined"
                fullWidth
                value={this.state.hotelName}
                onChange={this.handleInput}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <TextField
                name="address"
                id="address"
                multiline
                className={classes.textField}
                variant="outlined"
                fullWidth
                value={this.state.address}
                onChange={this.handleInput}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <TextField
                name="city"
                id="city"
                className={classes.textField}
                variant="outlined"
                fullWidth
                value={this.state.city}
                onChange={this.handleInput}
              />
            </Grid>
            <Grid item xs={12} md={6} sm={12}>
              <TextField
                name="pincode"
                id="pincode"
                className={classes.textField}
                variant="outlined"
                fullWidth
                value={this.state.pincode}
                onChange={this.handleInput}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6} sm={12}>
              <TextField
                id="mobile"
                name="mobileno"
                className={classes.textField}
                variant="outlined"
                fullWidth
                value={this.state.mobile}
                onChange={this.handleInput}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6} sm={12}>
              <TextField
                id="state"
                name="state"
                className={classes.textField}
                variant="outlined"
                fullWidth
                value={this.state.state}
                onChange={this.handleInput}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6} sm={12}>
              <TextField
                id="star"
                name="star"
                className={classes.textField}
                variant="outlined"
                fullWidth
                value={this.state.star}
                onChange={this.handleInput}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6} sm={12}>
              <TextField
                id="price"
                name="price"
                className={classes.textField}
                variant="outlined"
                fullWidth
                value={this.state.price}
                onChange={this.handleInput}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6} sm={12}>
              <TextField
                id="email"
                name="email"
                className={classes.textField}
                variant="outlined"
                placeholder="Enter Your Email"
                fullWidth
                value={this.state.email}
                onChange={this.handleInput}
              />
            </Grid>

            <Grid item xs={12} md={12} lg={12}>
              <TextField
                id="pancard"
                name="panno"
                className={classes.textField}
                variant="outlined"
                fullWidth
                value={this.state.pancard}
                onChange={this.handleInput}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                id="description"
                name="Description"
                className={classes.textField}
                variant="outlined"
                fullWidth
                value={this.state.description}
                onChange={this.handleInput}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Button
                onClick={this.handleSubmit}
                style={{ marginTop: '2rem' }}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={this.state.isChecking ? true : false}
              >
                {this.state.isChecking && <CircularProgress size={20} />}
                Update
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(style)(Layout);
