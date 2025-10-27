const express = require('express');
const router = express.Router();
const Food = require('../models/Food');
const { authenticateToken, requireRole } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage: storage });

// Create a new food item (Restaurant only)
router.post('/me/foods', 
    authenticateToken, 
    requireRole('restaurant'),
    upload.single('image'),
    async (req, res) => {
        try {
            const { name, price, description, is_available = true } = req.body;
            const image = req.file ? `/images/${req.file.filename}` : undefined;

            const food = new Food({
                food_name: name,
                food_price: price,
                food_image: image,
                description,
                is_available,
                restaurant_id: req.user.userId
            });

            await food.save();
            res.status(201).json(food);
        } catch (error) {
            console.error('Error creating food item:', error);
            res.status(500).json({ message: 'Error creating food item', error: error.message });
        }
    }
);

// Get all foods for the authenticated restaurant
router.get('/me/foods', 
    authenticateToken, 
    requireRole('restaurant'),
    async (req, res) => {
        try {
            const foods = await Food.find({ restaurant_id: req.user.userId });
            res.json(foods);
        } catch (error) {
            console.error('Error fetching restaurant foods:', error);
            res.status(500).json({ message: 'Error fetching restaurant foods', error: error.message });
        }
    }
);

// Update a food item (Restaurant only)
router.put('/me/foods/:foodId', 
    authenticateToken, 
    requireRole('restaurant'),
    upload.single('image'),
    async (req, res) => {
        try {
            const { foodId } = req.params;
            const { name, price, description, is_available } = req.body;
            
            const updateData = {};
            if (name) updateData.food_name = name;
            if (price) updateData.food_price = price;
            if (description) updateData.description = description;
            if (is_available !== undefined) updateData.is_available = is_available;
            if (req.file) updateData.food_image = `/images/${req.file.filename}`;

            const food = await Food.findOneAndUpdate(
                { _id: foodId, restaurant_id: req.user.userId },
                { $set: updateData },
                { new: true }
            );

            if (!food) {
                return res.status(404).json({ message: 'Food item not found or not authorized' });
            }

            res.json(food);
        } catch (error) {
            console.error('Error updating food item:', error);
            res.status(500).json({ message: 'Error updating food item', error: error.message });
        }
    }
);

// Delete a food item (Restaurant only)
router.delete('/me/foods/:foodId', 
    authenticateToken, 
    requireRole('restaurant'),
    async (req, res) => {
        try {
            const { foodId } = req.params;
            
            const food = await Food.findOneAndDelete({
                _id: foodId,
                restaurant_id: req.user.userId
            });

            if (!food) {
                return res.status(404).json({ message: 'Food item not found or not authorized' });
            }

            res.json({ message: 'Food item deleted successfully' });
        } catch (error) {
            console.error('Error deleting food item:', error);
            res.status(500).json({ message: 'Error deleting food item', error: error.message });
        }
    }
);

module.exports = router;
