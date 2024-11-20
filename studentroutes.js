const express = require('express');
const router = express.Router();
const studentController = require('./controllers/studentController');

// Route to add a new student
router.post('/students', studentController.addStudent);

// Route to get all students
router.get('/students', studentController.getStudents);

module.exports = router;
