const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Database connection
const mongoURI = process.env.MONGO_URI || 'your_default_local_mongodb_uri';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Middleware to parse JSON bodies and enable CORS
app.use(express.json());
app.use(cors());

// Basic route for homepage
app.get('/', (req, res) => {
  res.send('Welcome to the Autonomous Garden Planner!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Define PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
