require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');;
const dbConfig = require('./config/db');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3001;

// Allow all origins during development, replace with specific origin in production
app.use(cors());

mongoose.connect(dbConfig.url, dbConfig.options)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

app.use(bodyParser.json());

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to Heda Healing! Your source for holistic well-being.');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});