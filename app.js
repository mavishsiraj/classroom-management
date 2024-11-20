const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const studentRoutes = require('./routes/studentroutes');
const courseRoutes = require('./routes/courseroutes');
const bookingRoutes = require('./routes/bookingroutes');
const instructorRoutes = require('./routes/instructorroutes');
const authMiddleware = require('./middleware/authMiddleware');

app.use(express.json());

// Public routes
app.use(studentRoutes);
app.use(courseRoutes);
app.use(instructorRoutes);

// Protected routes (require authentication)
app.use('/bookings', authMiddleware.authenticate, bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
