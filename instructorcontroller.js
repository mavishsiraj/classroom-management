const db = require('../config/db');

// Add a new instructor
exports.addInstructor = async (req, res) => {
    const { name, email, department } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO Instructors (name, email, department) VALUES (?, ?, ?)',
            [name, email, department]
        );
        res.status(201).json({ message: 'Instructor added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error adding instructor', error: err.message });
    }
};

// Get all instructors
exports.getInstructors = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Instructors');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching instructors', error: err.message });
    }
};
