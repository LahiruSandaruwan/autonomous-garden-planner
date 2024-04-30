const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Import routes
const usersRoutes = require('./routes/users');
const gardensRoutes = require('./routes/gardens');
const plantsRoutes = require('./routes/plants');
const climateDataRoutes = require('./routes/climateData');
const soilDataRoutes = require('./routes/soilData');

// Database connection
const mongoURI = process.env.MONGO_URI || 'your_default_local_mongodb_uri';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Middleware to parse JSON bodies and enable CORS
app.use(express.json());
app.use(cors());

// Mount routes
app.use('/api/users', usersRoutes);
app.use('/api/gardens', gardensRoutes);
app.use('/api/plants', plantsRoutes);
app.use('/api/climate-data', climateDataRoutes);
app.use('/api/soil-data', soilDataRoutes);

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
