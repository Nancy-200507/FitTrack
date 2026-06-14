require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// Express app
const app = express();

// Allow requests from your Vercel frontend
app.use(cors({
  origin: 'https://fit-track-puce.vercel.app'
}));

// Middleware
app.use(express.json());

// Log every request
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000
})
.then(() => {
  // Start server
  app.listen(process.env.PORT, () => {
    console.log('MongoDB connected and listening on port', process.env.PORT);
  });
})
.catch((error) => {
  console.error("MongoDB Error:");
  console.error(error);
  console.error(error.message);
});