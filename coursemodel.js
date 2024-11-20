const db = require('../config/db');

// Add a new course
exports.addCourse = async (course_name, course_code, instructor_id) => {
    const [result] = await db.execute(
        'INSERT INTO Courses (course_name, course_code, instructor_id) VALUES (?, ?, ?)',
        [course_name, course_code, instructor_id]
    );
    return result;
};

// Get all courses
exports.getCourses = async () => {
    const [rows] = await db.execute('SELECT * FROM Courses');
    return rows;
};
