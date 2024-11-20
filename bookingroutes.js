const express = require('express');
const router = express.Router();
const bookingController = require('./controllers/bookingController');

// Route to create a new booking
router.post('/bookings', bookingController.createBooking);

// Route to get all bookings for a specific user
router.get('/bookings/:user_id', bookingController.getBookings);

module.exports = router;
