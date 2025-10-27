const express = require('express');
const router = express.Router();
const Food = require('../models/Food');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');

// List all restaurants (customers only)
router.get('/restaurants', 
    authenticateToken,
    async (req, res) => {
        try {
            const restaurants = await User.find(
                { role: 'restaurant' },
                { password: 0, __v: 0, createdAt: 0, updatedAt: 0 }
            );
            res.json(restaurants);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            res.status(500).json({ message: 'Error fetching restaurants', error: error.message });
        }
    }
);

// Get foods by restaurant (customers only)
router.get('/restaurants/:restaurantId/foods', 
    authenticateToken,
    async (req, res) => {
        try {
            const { restaurantId } = req.params;
            
            // Verify the restaurant exists
            const restaurant = await User.findById(restaurantId);
            if (!restaurant || restaurant.role !== 'restaurant') {
                return res.status(404).json({ message: 'Restaurant not found' });
            }
            
            const foods = await Food.find({ 
                restaurant_id: restaurantId,
                is_available: true 
            });
            
            res.json(foods);
        } catch (error) {
            console.error('Error fetching restaurant foods:', error);
            res.status(500).json({ message: 'Error fetching restaurant foods', error: error.message });
        }
    }
);

// Get all available foods across all restaurants (customers only)
router.get('/foods', 
    authenticateToken,
    async (req, res) => {
        try {
            const foods = await Food.find({ is_available: true })
                .populate('restaurant_id', 'fullname email');
                
            res.json(foods);
        } catch (error) {
            console.error('Error fetching all foods:', error);
            res.status(500).json({ message: 'Error fetching all foods', error: error.message });
        }
    }
);

module.exports = router;
