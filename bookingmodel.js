const db = require('../config/db');

// Create a new booking
exports.createBooking = async (user_id, classroom_id, timeslot_id, booking_date, purpose) => {
    const [result] = await db.execute(
        'INSERT INTO Bookings (user_id, classroom_id, timeslot_id, booking_date, purpose) VALUES (?, ?, ?, ?, ?)',
        [user_id, classroom_id, timeslot_id, booking_date, purpose]
    );
    return result;
};

// Get all bookings for a specific user
exports.getBookingsByUser = async (user_id) => {
    const [rows] = await db.execute('SELECT * FROM Bookings WHERE user_id = ?', [user_id]);
    return rows;
};
