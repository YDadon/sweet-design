require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Built-in body parser for JSON

// simple route
app.get('/', (req, res) => {
  res.send('The server is running properly.');
});

// Connect to MongoDB
mongoose.connect(MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
    // Start the server after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});