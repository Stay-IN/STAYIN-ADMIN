const router = require('express').Router();
const multer = require('multer');
const DIR = './public/';

const { Hotel } = require('Models');

const { AuthController, HotelController } = require('Controllers');
// Auth Routes
router.post('/login', AuthController.login);
router.post('/signup', AuthController.signup);
router.post('/managersignup', AuthController.managersignup);
router.post('/managerlogin', AuthController.managerlogin);
router.get('/manager/:_id', AuthController.getMById);

// Hotel Controllers
router.get('/hotels', HotelController.getHotels);
router.post('/addhotel', HotelController.addHotel);
router.get('/hotels/:_id', HotelController.getHotelsById);
router.get('/hotels/search/:search', HotelController.searchHotel);
router.delete('/delhotel/:_id', HotelController.deleteHotelsById);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname
      .toLowerCase()
      .split(' ')
      .join('-');
    cb(null, 'stayin' + '-' + fileName);
  }
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

router.post(
  '/Addhotelhere',
  upload.array('imgCollection', 6),
  async (req, res, next) => {
    const reqFiles = [];
    const url = req.protocol + '://' + req.get('host');
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + '/public/' + req.files[i].filename);
    }
    const {
      hotelName,
      slug,
      type,
      address,
      city,
      pincode,
      state,
      mobile,
      capacity,
      wifi,
      price,
      star,
      email,
      pancard,
      description
    } = req.body;

    const message = [];
    if (!hotelName) {
      message.push('hotelname is required');
    }
    if (!address) {
      message.push('address is required');
    }
    if (!slug) {
      message.push('Categary is required');
    }
    if (!type) {
      message.push('RoomType is required');
    }
    if (!city) {
      message.push('city is required');
    }
    if (!pincode) {
      message.push('pincode is required');
    }
    if (!mobile) {
      message.push('mobile is required');
    }
    if (!price) {
      message.push('price is required');
    }
    if (!state) {
      message.push('state is required');
    }
    if (!star) {
      message.push('star is required');
    }
    if (!email) {
      message.push('email is required');
    }
    if (!pancard) {
      message.push('pancard is required');
    }
    if (!description) {
      message.push('description is required');
    }
    if (!capacity) {
      message.push('capacity is required');
    }

    if (
      !email ||
      !hotelName ||
      !address ||
      !city ||
      !pincode ||
      !mobile ||
      !price ||
      !state ||
      !star ||
      !email ||
      !pancard ||
      !type ||
      !capacity ||
      !slug ||
      !description
    ) {
      res.json({
        code: 401,
        data: {
          message
        },
        success: false
      });
      return;
    }

    const hotelData = {
      hotelName,
      slug,
      type,
      address,
      city,
      pincode,
      state,
      mobile,
      capacity,
      wifi,
      price,
      star,
      email,
      pancard,
      description,
      imgCollection: reqFiles
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
      } else {
        const pancardUnick = await Hotel.findOne({ pancard });
        if (pancardUnick) {
          return res.status(200).json({
            code: 200,
            data: {
              message: ['pancard must unique']
            },
            success: false
          });
        }
        hotel = await new Hotel(hotelData).save();
        res.status(200);
        res.json({
          code: 200,
          data: {
            message: ['Hotel Added'],
            hotel
          },
          success: true
        });
        return;
      }
    } catch (error) {
      res.json({ msg: 'server error', error });
    }
  }
);

module.exports = router;
