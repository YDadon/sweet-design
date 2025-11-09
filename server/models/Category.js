// models/Category.js

const mongoose = require('mongoose');

// Define the Category schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    // Optional description for the category
    description: {
        type: String,
        default: ''
    }
});

// Export the Category model
module.exports = mongoose.model('Category', categorySchema);