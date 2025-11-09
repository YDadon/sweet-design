
// server/models/Subcategory.js
const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
    
    // Subcategory name
    name: { 
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    // Reference to the parent category
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to Category model
        required: true,
    },

    // Optional description for the subcategory
    description: {
        type: String,
        default: ''
    }
});

// Export the Subcategory model
module.exports = mongoose.model('Subcategory', SubcategorySchema);