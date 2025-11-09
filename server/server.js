require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.DB_URI

//import routes
const productRoutes = require('./routes/producrRoutes');
const subcategoryRoutes = require('./routes/subCategoryRoutes'); 
const categoryRoutes = require('./routes/categoryRoutes');

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Built-in body parser for JSON

// simple route
app.get('/', (req, res) => {
  res.send('The server is running properly.');
});

// Use routes
app.use('/api/products', productRoutes);
app.use('/api/subcategories', subcategoryRoutes); // Use subcategory routes
app.use('/api/categories', categoryRoutes); // Use category routes

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