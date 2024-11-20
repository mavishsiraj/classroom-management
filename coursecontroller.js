const db = require('../config/db');

// Add a new course
exports.addCourse = async (req, res) => {
    const { course_name, course_code, instructor_id } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO Courses (course_name, course_code, instructor_id) VALUES (?, ?, ?)',
            [course_name, course_code, instructor_id]
        );
        res.status(201).json({ message: 'Course added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error adding course', error: err.message });
    }
};

// Get all courses
exports.getCourses = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Courses');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching courses', error: err.message });
    }
};
