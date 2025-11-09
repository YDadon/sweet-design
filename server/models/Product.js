const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    // Product name
    name: {
        type: String,
        required: true,
        trim: true,    
    },

    // Product description
    description: {
        type: String,
        required: true,
        // trim: true,
    },

    // Product category
    category: {
       type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to Category model
        required: true,
       
    },
    // Subcategories - optional
    subCategories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory', // Reference to Subcategory model
        default: [],
    },

    // Product price
    imageUrl: [{
        type: String,
        required: true,
    }],

    price: {
        type: Number,
        required: true,
        min: 0,
    },

    customFields: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },

});

// Export the Product model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;