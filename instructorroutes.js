const express = require('express');
const router = express.Router();
const instructorController = require('./controllers/instructorController');

// Route to add a new instructor
router.post('/instructors', instructorController.addInstructor);

// Route to get all instructors
router.get('/instructors', instructorController.getInstructors);

module.exports = router;
