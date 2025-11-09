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
        type: String,
        required: true,
        enum: ['Events', 'Holidays', 'Kids', 'TeamGifts','Seasonal', 'Other'],
       
    },
    // Subcategories - optional
    subCategories: {
        type: [String],
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

const Product = mongoose.model('Product', productSchema);
module.exports = Product;