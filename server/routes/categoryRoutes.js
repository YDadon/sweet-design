const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

//GET all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//POST create a new category
router.post('/', async (req, res) => {
    try {
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (err) {
        if (err.code === 11000) { // שגיאת כפילות
            return res.status(409).json({ message: 'Category name already exists.' });
        }
        res.status(400).json({ message: err.message });
    }
});

// ... [נוכל להוסיף כאן: GET by ID, PUT, DELETE]

// Export the router
module.exports = router;