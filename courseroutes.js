const express = require('express');
const router = express.Router();
const courseController = require('./controllers/courseController');

// Route to add a new course
router.post('/courses', courseController.addCourse);

// Route to get all courses
router.get('/courses', courseController.getCourses);

module.exports = router;
