// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // ייבוא מודל המוצר שיצרנו קודם

// ------------------------------------------------------------------
// 1. נתיב: GET /api/products
// תיאור: קבלת כל המוצרים
// ------------------------------------------------------------------
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ------------------------------------------------------------------
// 2. נתיב: POST /api/products
// תיאור: יצירת מוצר חדש (הדמיה לפעולת אדמין)
// ------------------------------------------------------------------
router.post('/', async (req, res) => {
    // req.body צריך להכיל: { name, description, category, imageURLs, ... }
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        subCategories: req.body.subCategories,
        imageUrl: req.body.imageUrl,
        price: req.body.price || 0,
        // customFields: req.body.customFields
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ... [נוכל להוסיף כאן: GET by ID, PUT, DELETE]

module.exports = router;