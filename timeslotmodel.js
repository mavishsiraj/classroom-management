const db = require('../config/db');

// Add a new timeslot
exports.addTimeslot = async (start_time, end_time) => {
    const [result] = await db.execute(
        'INSERT INTO Timeslots (start_time, end_time) VALUES (?, ?)',
        [start_time, end_time]
    );
    return result;
};

// Get all timeslots
exports.getTimeslots = async () => {
    const [rows] = await db.execute('SELECT * FROM Timeslots');
    return rows;
};
