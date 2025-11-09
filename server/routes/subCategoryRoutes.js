// routes/subcategoryRoutes.js

const express = require('express');
const router = express.Router();
const Subcategory = require('../models/Subcategory');

// ------------------------------------------------------------------
// 1. POST /api/subcategories
// תיאור: יצירת תת-קטגוריה חדשה
// ------------------------------------------------------------------
router.post('/', async (req, res) => {
    const { name, parentCategory, description } = req.body;
    
    // בדיקת שדות חובה
    if (!name || !parentCategory) {
        return res.status(400).json({ message: 'Name and parentCategory are required.' });
    }

    try {
        const newSubcategory = new Subcategory({ name, parentCategory, description });
        await newSubcategory.save();
        res.status(201).json(newSubcategory);
    } catch (err) {
        // שגיאת 11000 היא בדרך כלל שגיאת unique (כפילות)
        if (err.code === 11000) {
            return res.status(409).json({ message: 'Subcategory name already exists.' });
        }
        res.status(400).json({ message: err.message });
    }
});

// ------------------------------------------------------------------
// 2. GET /api/subcategories
// תיאור: קבלת כל תת-הקטגוריות
// ------------------------------------------------------------------
router.get('/', async (req, res) => {
    try {
        const subcategories = await Subcategory.find().sort({ parentCategory: 1, name: 1 });
        res.status(200).json(subcategories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ------------------------------------------------------------------
// 3. GET /api/subcategories/:parentCategoryName
// תיאור: קבלת תת-קטגוריות לפי קטגוריה ראשית
// ------------------------------------------------------------------
router.get('/:parentCategoryName', async (req, res) => {
    try {
        const parentCategory = req.params.parentCategoryName;
        const subcategories = await Subcategory.find({ parentCategory: parentCategory }).sort({ name: 1 });
        res.status(200).json(subcategories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;