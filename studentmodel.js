const db = require('../config/db');

// Add a new student
exports.addStudent = async (name, email, password, role) => {
    const [result] = await db.execute(
        'INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)', 
        [name, email, password, role]
    );
    return result;
};

// Get all students
exports.getStudents = async () => {
    const [rows] = await db.execute('SELECT * FROM Users WHERE role = "student"');
    return rows;
};
