const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Food = require('../models/Food');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Checkout and create order (customer only)
router.post('/checkout', 
    authenticateToken, 
    requireRole('customer'),
    async (req, res) => {
        try {
            const userId = req.user.userId;
            
            // Get user's cart items
            const cartItems = await Cart.find({ user_id: userId }).populate('food_id');
            
            if (cartItems.length === 0) {
                return res.status(400).json({ message: 'Cart is empty' });
            }
            
            // Group items by restaurant
            const ordersByRestaurant = {};
            
            for (const item of cartItems) {
                const food = item.food_id;
                if (!food) continue;
                
                const restaurantId = food.restaurant_id;
                
                if (!ordersByRestaurant[restaurantId]) {
                    ordersByRestaurant[restaurantId] = {
                        items: [],
                        total: 0
                    };
                }
                
                ordersByRestaurant[restaurantId].items.push({
                    food_id: food._id,
                    name: food.food_name,
                    quantity: item.quantity,
                    price: food.food_price
                });
                
                ordersByRestaurant[restaurantId].total += food.food_price * item.quantity;
            }
            
            // Create orders for each restaurant
            const createdOrders = [];
            for (const [restaurantId, orderData] of Object.entries(ordersByRestaurant)) {
                const order = new Order({
                    user_id: userId,
                    restaurant_id: restaurantId,
                    items: orderData.items,
                    total_amount: orderData.total,
                    status: 'placed'
                });
                await order.save();
                createdOrders.push(order);
            }

            // Clear the cart (best-effort without transactions)
            await Cart.deleteMany({ user_id: userId });

            return res.status(201).json(createdOrders);
            
        } catch (error) {
            console.error('Error during checkout:', error);
            res.status(500).json({ 
                message: 'Error during checkout', 
                error: error.message 
            });
        }
    }
);

// Get customer's order history
router.get('/my', 
    authenticateToken, 
    requireRole('customer'),
    async (req, res) => {
        try {
            const orders = await Order.find({ user_id: req.user.userId })
                .populate('restaurant_id', 'fullname')
                .sort({ createdAt: -1 });
                
            res.json(orders);
        } catch (error) {
            console.error('Error fetching order history:', error);
            res.status(500).json({ 
                message: 'Error fetching order history', 
                error: error.message 
            });
        }
    }
);

// Get restaurant's received orders
router.get('/restaurant', 
    authenticateToken, 
    requireRole('restaurant'),
    async (req, res) => {
        try {
            const orders = await Order.find({ restaurant_id: req.user.userId })
                .populate('user_id', 'fullname email')
                .sort({ createdAt: -1 });
                
            res.json(orders);
        } catch (error) {
            console.error('Error fetching restaurant orders:', error);
            res.status(500).json({ 
                message: 'Error fetching restaurant orders', 
                error: error.message 
            });
        }
    }
);

// Update order status (restaurant only)
router.put('/:orderId/status', 
    authenticateToken, 
    requireRole('restaurant'),
    async (req, res) => {
        try {
            const { orderId } = req.params;
            const { status } = req.body;
            
            if (!['preparing', 'ready', 'delivered', 'cancelled'].includes(status)) {
                return res.status(400).json({ message: 'Invalid status' });
            }
            
            const order = await Order.findOneAndUpdate(
                { 
                    _id: orderId, 
                    restaurant_id: req.user.userId 
                },
                { status },
                { new: true }
            );
            
            if (!order) {
                return res.status(404).json({ message: 'Order not found or not authorized' });
            }
            
            res.json(order);
            
        } catch (error) {
            console.error('Error updating order status:', error);
            res.status(500).json({ 
                message: 'Error updating order status', 
                error: error.message 
            });
        }
    }
);

module.exports = router;
