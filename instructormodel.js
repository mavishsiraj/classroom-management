const db = require('../config/db');

// Add a new instructor
exports.addInstructor = async (name, email, department) => {
    const [result] = await db.execute(
        'INSERT INTO Instructors (name, email, department) VALUES (?, ?, ?)',
        [name, email, department]
    );
    return result;
};

// Get all instructors
exports.getInstructors = async () => {
    const [rows] = await db.execute('SELECT * FROM Instructors');
    return rows;
};
