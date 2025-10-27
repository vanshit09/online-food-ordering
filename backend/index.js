const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
<<<<<<< HEAD
const jwt = require('jsonwebtoken');
const multer = require('multer');
const formidable = require('formidable');
const fs = require("fs");

// Import models
const User = require('./models/User');
const Food = require('./models/Food');
const Cart = require('./models/Cart');

// Import utilities
const { validateEmail, validatePassword, validateName, sanitizeInput } = require('./utils/validation');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({
    storage: storage
});
=======
const fs = require('fs');
const jwt = require('jsonwebtoken');
// Mongoose models used by endpoints in this file
const User = require('./models/User');
const Food = require('./models/Food');
const Cart = require('./models/Cart');
const Order = require('./models/Order');

// Import routes
const authRoutes = require('./routes/auth.routes');
const restaurantRoutes = require('./routes/restaurant.routes');
const customerRoutes = require('./routes/customer.routes');
const orderRoutes = require('./routes/order.routes');
>>>>>>> f5a76c9 (final commit)

// Middleware
app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Set default values for environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || 'default_jwt_secret_key_change_in_production_12345';
const PORT = process.env.PORT || 5000;

<<<<<<< HEAD
console.log('Environment variables:');
console.log('MONGODB_URI:', MONGODB_URI);
console.log('ACCESS_TOKEN:', ACCESS_TOKEN ? 'Set' : 'Not set');
console.log('PORT:', PORT);
=======
// Log environment variables (except sensitive ones in production)
if (process.env.NODE_ENV !== 'production') {
    console.log('Environment variables:');
    console.log('MONGODB_URI:', MONGODB_URI);
    console.log('PORT:', PORT);
}
>>>>>>> f5a76c9 (final commit)

// MongoDB connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB!');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Authentication middleware
function authenticateUser(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }
    
    jwt.verify(token, ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
}

<<<<<<< HEAD
// Routes
app.get('/', (req, res) => {
    res.send('Welcome to my server');
});

=======
// Role-based access control
function requireRole(role) {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
        }
        next();
    };
}

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Food Ordering API');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api', customerRoutes);
app.use('/api/orders', orderRoutes);

// Note: 404 and error handlers are registered at the end of the file, after all routes.

>>>>>>> f5a76c9 (final commit)
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0'
    });
});

// Test endpoint for frontend debugging
app.get('/api/test', (req, res) => {
    res.status(200).json({
        message: 'Backend is reachable from frontend',
        timestamp: new Date().toISOString(),
        cors: 'enabled'
    });
});

// Debug endpoint to check all users
app.get('/api/debug/users', async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            message: 'All users in database',
            count: users.length,
            users: users
        });
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error",
            message: err.message
        });
    }
});

app.get('/api/login', (req, res) => {
    res.send('Login');
});

app.get('/api/register', (req, res) => {
    res.send('Registration');
});

// Get all users
app.get('/api/user', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

// User registration
app.post("/api/register", async (req, res) => {
    try {
<<<<<<< HEAD
        let { fullname, email, password } = req.body;
=======
        let { fullname, email, password, role } = req.body;
>>>>>>> f5a76c9 (final commit)
        
        console.log('Registration attempt:', { fullname, email, password: password ? '***' : 'empty' });
        
        // Sanitize inputs
        fullname = sanitizeInput(fullname);
        email = sanitizeInput(email);
        password = sanitizeInput(password);
<<<<<<< HEAD
=======
        role = sanitizeInput(role);
>>>>>>> f5a76c9 (final commit)
        
        // Validate inputs
        if (!fullname || !email || !password) {
            return res.status(400).json({
                error: "Please fill all the credentials properly"
            });
        }

        if (!validateName(fullname)) {
            return res.status(400).json({
                error: "Please enter a valid name (at least 2 characters, letters only)"
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                error: "Please enter a valid email address"
            });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({
                error: "Password must be at least 6 characters long"
            });
        }

<<<<<<< HEAD
=======
        // Validate role
        if (role && !['customer', 'restaurant'].includes(role)) {
            return res.status(400).json({
                error: "Invalid role. Allowed: customer, restaurant"
            });
        }

>>>>>>> f5a76c9 (final commit)
        // Check if user already exists (case insensitive)
        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
        if (existingUser) {
            return res.status(400).json({
                error: "User with this email already exists"
            });
        }

        // Create new user
        const user = new User({
            fullname: fullname.trim(),
            email: email.toLowerCase().trim(),
<<<<<<< HEAD
            password: password
=======
            password: password,
            role: role || 'customer'
>>>>>>> f5a76c9 (final commit)
        });

        await user.save();
        console.log('User registered successfully:', user.fullname);

        // Generate JWT token
        const accessToken = jwt.sign(
<<<<<<< HEAD
            { userId: user._id, name: fullname }, 
=======
            { userId: user._id, name: fullname, role: user.role }, 
>>>>>>> f5a76c9 (final commit)
            ACCESS_TOKEN,
            { expiresIn: '24h' }
        );

        return res.status(201).json({
            message: "Registration successful",
            accessToken: accessToken,
            user: {
                id: user._id,
                name: user.fullname,
<<<<<<< HEAD
                email: user.email
=======
                email: user.email,
                role: user.role
>>>>>>> f5a76c9 (final commit)
            }
        });
    } catch (err) {
        console.error('Registration error:', err);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

// User login
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        console.log('Login attempt:', { email, password: password ? '***' : 'empty' });
        
        if (!email || !password) {
            return res.status(400).json({
                message: "Enter email and password"
            });
        }

        // First check if user exists
        const user = await User.findOne({ email: email.toLowerCase().trim() });
        console.log('User found:', user ? 'Yes' : 'No');
        
        if (!user) {
            return res.status(400).json({
                message: "User not found with this email"
            });
        }

        // Check password (since we're storing plain text for now)
        if (user.password !== password) {
            console.log('Password mismatch');
            return res.status(400).json({
                message: "Incorrect password"
            });
        }

        // Generate JWT token
        const accessToken = jwt.sign(
<<<<<<< HEAD
            { userId: user._id, name: user.fullname }, 
=======
            { userId: user._id, name: user.fullname, role: user.role }, 
>>>>>>> f5a76c9 (final commit)
            ACCESS_TOKEN,
            { expiresIn: '24h' }
        );

        console.log('Login successful for user:', user.fullname);
        return res.status(200).json({
            message: "Login successful",
            accessToken: accessToken,
            user: {
                id: user._id,
                name: user.fullname,
<<<<<<< HEAD
                email: user.email
=======
                email: user.email,
                role: user.role
>>>>>>> f5a76c9 (final commit)
            }
        });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

<<<<<<< HEAD
// Add food item
app.post('/api/foods', async (req, res) => {
    try {
        const { name, price } = req.body;
        
        if (!name || !price) {
            return res.status(400).json({
                error: "Food name and price are required"
            });
        }

        const food = new Food({
            food_name: name,
            food_price: price,
            food_image: "./images/Vanillashake.jpeg"
        });

        await food.save();

        return res.status(201).json({
            message: "Food item added successfully",
            food: food
        });
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

// Get all food items
app.get('/api/foods', async (req, res) => {
    try {
        const foods = await Food.find();
=======

// Auth required: Get all food items
app.get('/api/foods', authenticateUser, async (req, res) => {
    try {
        const foods = await Food.find().populate('restaurant_id', 'fullname');
>>>>>>> f5a76c9 (final commit)
        return res.status(200).json(foods);
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

<<<<<<< HEAD
=======
// Auth required: List all restaurants
app.get('/api/restaurants', authenticateUser, async (req, res) => {
    try {
        const restaurants = await User.find({ role: 'restaurant' }).select('fullname email');
        return res.status(200).json(restaurants.map(r => ({ id: r._id, name: r.fullname, email: r.email })));
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Auth required: Foods by restaurant
app.get('/api/restaurants/:restaurantId/foods', authenticateUser, async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const foods = await Food.find({ restaurant_id: restaurantId });
        return res.status(200).json(foods);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Note: Restaurant food CRUD moved to routes/restaurant.routes.js (with image upload support)

// Orders: model-backed endpoints
// Place order from cart (creates one order per restaurant)
app.post('/api/orders/checkout', authenticateUser, requireRole('customer'), async (req, res) => {
    try {
        const userId = req.user.userId;
        const cartItems = await Cart.find({ user_id: userId }).populate('food_id');
        if (!cartItems.length) return res.status(400).json({ error: 'Cart is empty' });

        // Group by restaurant
        const byRestaurant = new Map();
        for (const item of cartItems) {
            const restId = String(item.food_id.restaurant_id);
            if (!byRestaurant.has(restId)) byRestaurant.set(restId, []);
            byRestaurant.get(restId).push(item);
        }

        const createdOrders = [];
        for (const [restaurantId, items] of byRestaurant.entries()) {
            const orderItems = items.map(ci => ({
                food_id: ci.food_id._id,
                name: ci.food_id.food_name,
                quantity: ci.quantity,
                price: ci.food_id.food_price
            }));
            const total = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

            const order = new Order({
                user_id: userId,
                restaurant_id: restaurantId,
                items: orderItems,
                total_amount: total,
                status: 'placed'
            });
            await order.save();
            createdOrders.push(order);
        }

        // Clear cart
        await Cart.deleteMany({ user_id: userId });

        return res.status(201).json({ message: 'Order(s) placed', orders: createdOrders });
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Customer: my orders
app.get('/api/orders/my', authenticateUser, requireRole('customer'), async (req, res) => {
    try {
        const orders = await Order.find({ user_id: req.user.userId })
            .sort({ createdAt: -1 });
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Restaurant: orders received
app.get('/api/orders/restaurant', authenticateUser, requireRole('restaurant'), async (req, res) => {
    try {
        const orders = await Order.find({ restaurant_id: req.user.userId })
            .sort({ createdAt: -1 });
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});

>>>>>>> f5a76c9 (final commit)
// Add item to cart (protected route)
app.post('/api/cart', authenticateUser, async (req, res) => {
    try {
        const { food_id } = req.body;
        const user_id = req.user.userId;
        
        if (!food_id) {
            return res.status(400).json({
                error: "Food ID is required"
            });
        }

        // Check if food item exists
        const food = await Food.findById(food_id);
        if (!food) {
            return res.status(404).json({
                error: "Food item not found"
            });
        }

        // Check if item already exists in cart
        const existingCartItem = await Cart.findOne({ 
            food_id: food_id, 
            user_id: user_id 
        });

        if (existingCartItem) {
            // Update quantity
            existingCartItem.quantity += 1;
            await existingCartItem.save();
            
            return res.status(200).json({
                message: "Quantity updated successfully"
            });
        } else {
            // Add new item to cart
            const cartItem = new Cart({
                food_id: food_id,
                user_id: user_id,
                quantity: 1
            });

            await cartItem.save();

            return res.status(200).json({
                message: "Item added to cart successfully"
            });
        }
    } catch (err) {
        console.error('Add to cart error:', err);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

// Get cart items
app.get('/api/cart', async (req, res) => {
    try {
        const cartItems = await Cart.find()
            .populate('food_id', 'food_name food_price food_image')
            .select('quantity food_id');
        
        return res.status(200).json(cartItems);
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Get cart items for specific user (protected route)
app.get('/api/cart/:userId', authenticateUser, async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Verify user can only access their own cart
        if (req.user.userId !== userId) {
            return res.status(403).json({
                error: "Access denied"
            });
        }
        
        const cartItems = await Cart.find({ user_id: userId })
            .populate('food_id', 'food_name food_price food_image')
            .select('quantity food_id');
        
        return res.status(200).json(cartItems);
    } catch (err) {
        console.error('Get cart error:', err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Get user profile (protected route)
app.get('/api/profile', authenticateUser, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }
        
        return res.status(200).json({
            user: {
                id: user._id,
                name: user.fullname,
                email: user.email,
                createdAt: user.createdAt
            }
        });
    } catch (err) {
        console.error('Get profile error:', err);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

// Update cart item quantity
app.put('/api/cart/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params;
        const { quantity } = req.body;
        
        if (quantity < 1) {
            return res.status(400).json({
                error: "Quantity must be at least 1"
            });
        }

        const cartItem = await Cart.findByIdAndUpdate(
            cartId,
            { quantity: quantity },
            { new: true }
        ).populate('food_id', 'food_name food_price food_image');

        if (!cartItem) {
            return res.status(404).json({
                error: "Cart item not found"
            });
        }

        return res.status(200).json({
            message: "Cart item updated successfully",
            cartItem: cartItem
        });
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

// Remove item from cart
app.delete('/api/cart/:cartId', async (req, res) => {
    try {
        const { cartId } = req.params;
        
        const cartItem = await Cart.findByIdAndDelete(cartId);
        
        if (!cartItem) {
            return res.status(404).json({
                error: "Cart item not found"
            });
        }

        return res.status(200).json({
            message: "Item removed from cart successfully"
        });
    } catch (err) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
});

// Clear entire cart for a user
app.delete('/api/cart/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        await Cart.deleteMany({ user_id: userId });
        
        return res.status(200).json({
            message: "Cart cleared successfully"
        });
    } catch (err) {
<<<<<<< HEAD
        return res.status(500).json({
            error: "Internal server error"
=======
        console.error('Error:', err);
        res.status(500).json({ 
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? err.message : {}
>>>>>>> f5a76c9 (final commit)
        });
    }
});

<<<<<<< HEAD
=======
// 404 handler (MUST be after all routes)
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

>>>>>>> f5a76c9 (final commit)
const port = PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});