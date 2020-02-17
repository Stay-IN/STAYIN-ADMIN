const { Hotel } = require('Models');

const addHotel = async (req, res, next) => {
  const {
    hotelName,
    address,
    city,
    pincode,
    state,
    mobile,
    price,
    star,
    email,
    pancard,
    description
  } = req.body;

  const hotelData = {
    hotelName,
    address,
    city,
    pincode,
    state,
    mobile,
    price,
    star,
    email,
    pancard,
    description
  };
  try {
    const Uhotel = await Hotel.findOne({ email });
    if (Uhotel) {
      hotel = await Hotel.findOneAndUpdate(
        { email },
        { $set: hotelData },
        { new: true }
      );

      return res.status(200).json({
        code: 200,
        data: {
          message: ['Hotel Updated'],
          hotel
        },
        success: true
      });
    }
  } catch (error) {
    res.json({ msg: 'server error', error });
  }
};

const getHotels = async (req, res, next) => {
  const hotels = await Hotel.find();
  res.json({
    code: 200,
    data: {
      hotels
    },
    success: true
  });
};

const getHotelsById = async (req, res, next) => {
  const { _id } = req.params;
  const hotels = await Hotel.findOne({ _id });
  if (hotels) {
    res.json({
      code: 200,
      data: {
        hotels
      },
      success: true
    });
  } else {
    res.json({
      code: 200,
      data: {
        message: ['No Hotel Found']
      },
      success: false
    });
  }
};

const searchHotel = async (req, res, next) => {
  const { search } = req.params;
  const hotels = await Hotel.find({
    $or: [
      { hotelName: { $regex: search, $options: 'i' } },
      { city: { $regex: search, $options: 'i' } }
    ]
  });
  return res.json({
    code: 200,
    data: {
      hotels
    },
    success: true
  });
};

const deleteHotelsById = async (req, res, next) => {
  const { _id } = req.params;
  await Hotel.findOneAndDelete({ _id });
  res.json({
    code: 200,
    data: {
      message: ['Hotel Removed']
    }
  });
};

module.exports = {
  addHotel,
  getHotels,
  getHotelsById,
  searchHotel,
  deleteHotelsById
};
