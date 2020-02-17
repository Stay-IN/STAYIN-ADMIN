const mongoose = require('mongoose');
const { SchemaOptions } = require('Models');

const Schema = mongoose.Schema;

const hotelSchema = new Schema(
  {
    hotelName: {
      type: mongoose.Schema.Types.String,
      require: true
    },
    slug: {
      type: mongoose.Schema.Types.String,
      require: true
    },
    type: {
      type: mongoose.Schema.Types.String,
      require: true
    },
    address: {
      type: mongoose.Schema.Types.String,
      require: true
    },
    city: {
      type: mongoose.Schema.Types.String,
      require: true
    },
    pincode: {
      type: mongoose.Schema.Types.Number,
      require: true
    },
    state: {
      type: mongoose.Schema.Types.String,
      require: true
    },
    star: {
      type: mongoose.Schema.Types.Number,
      require: true
    },
    email: {
      type: mongoose.Schema.Types.String,
      require: true,
      unique: true
    },
    mobile: {
      type: mongoose.Schema.Types.Number,
      require: true
    },
    price: {
      type: mongoose.Schema.Types.Number,
      require: true
    },
    capacity: {
      type: mongoose.Schema.Types.Number,
      require: true
    },
    wifi: { type: Boolean, default: false },
    pancard: {
      type: mongoose.Schema.Types.String,
      require: true,
      unique: true
    },
    description: {
      type: mongoose.Schema.Types.String,
      require: true
    },
    imgCollection: {
      type: Array
    },
    date: { type: Date, default: Date.now }
  },
  SchemaOptions
);

hotelSchema.index({ hotelName: 1, sparse: true }, { background: true });

module.exports = mongoose.model('Hotel', hotelSchema);
