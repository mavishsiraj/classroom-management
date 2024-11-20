const db = require('../config/db'); // Assume db.js handles DB connection

// Add a new student
exports.addStudent = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, password, role]
        );
        res.status(201).json({ message: 'Student added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error adding student', error: err.message });
    }
};

// Get all students
exports.getStudents = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Users WHERE role = "student"');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching students', error: err.message });
    }
};
