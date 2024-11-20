const db = require('../config/db');

// Create a new booking
exports.createBooking = async (req, res) => {
    const { user_id, classroom_id, timeslot_id, booking_date, purpose } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO Bookings (user_id, classroom_id, timeslot_id, booking_date, purpose) VALUES (?, ?, ?, ?, ?)',
            [user_id, classroom_id, timeslot_id, booking_date, purpose]
        );
        res.status(201).json({ message: 'Booking created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating booking', error: err.message });
    }
};

// Get all bookings for a user
exports.getBookings = async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const result = await db.query('SELECT * FROM Bookings WHERE user_id = ?', [user_id]);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching bookings', error: err.message });
    }
};
