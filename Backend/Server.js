require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

const app = express();

// CORS FIX
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://fit-track-puce.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


// Middleware
app.use(express.json());

// Logger
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// MongoDB + Server
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  app.listen(PORT, () => {
    console.log('MongoDB connected and running on', PORT);
  });
})
.catch((err) => {
  console.error('MongoDB Error:', err);
});