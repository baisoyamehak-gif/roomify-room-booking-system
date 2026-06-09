/* eslint-disable no-undef */

const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const app = require('./app.js');
const { startNotificationScheduler } = require('./scheduler/notifications');
dotenv.config();
connectDB().then(async () => {
  const Booking = require('./models/Booking');
  await Booking.initializeCounter();
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    startNotificationScheduler();
  });
});