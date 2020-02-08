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
    state: '',
    star: '',
    email: '',
    pancard: '',
    description: '',
    image: '',
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
      state,
      star,
      email,
      pancard,
      description,
      image
    } = this.state;

    // Api Code

    const hotelImageUrl = await HotelServices.addHotelImage(image.name, image);

    const response = await HotelServices.addHotel({
      hotelName,
      address,
      city,
      pincode,
      mobile,
      state,
      star,
      email,
      pancard,
      description,
      image: hotelImageUrl
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
      state: '',
      star: '',
      email: '',
      pancard: '',
      description: '',
      image: '',
      isAdded: true,
      isChecking: false
    });
  };

  handleImage = e => {
    this.setState({ image: e.target.files[0] });
  };

  state = {
    hotels: []
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
      state,
      star,
      pancard,
      description,
      image,
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
        state,
        star,
        email,
        pancard,
        description,
        image
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
            <Grid item xs={12} md={12} lg={12} sm={12}>
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
            <Grid item xs={12} md={12} lg={12}>
              <TextField
                id="image"
                type="file"
                name="image"
                className={classes.textField}
                variant="outlined"
                fullWidth
                onChange={this.handleImage}
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