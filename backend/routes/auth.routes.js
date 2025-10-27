const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validateEmail, validatePassword, validateName } = require('../utils/validation');

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { fullname, email, password, role = 'customer' } = req.body;

        // Validate input
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!validateName(fullname)) {
            return res.status(400).json({ message: 'Invalid name format' });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        if (!validatePassword(password)) {
            return res.status(400).json({
                message: 'Password must be at least 6 characters long and contain at least one number and one letter'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            fullname,
            email,
            password: hashedPassword,
            role: role === 'restaurant' ? 'restaurant' : 'customer'
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.ACCESS_TOKEN || 'default_jwt_secret_key_change_in_production_12345',
            { expiresIn: '24h' }
        );

        // Return user data (excluding password) and token
        const userData = user.toObject();
        delete userData.password;
        delete userData.__v;

        res.status(201).json({
            message: 'User registered successfully',
            user: userData,
            token
        });

    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ 
            message: 'Error during registration', 
            error: error.message 
        });
    }
});

// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.ACCESS_TOKEN || 'default_jwt_secret_key_change_in_production_12345',
            { expiresIn: '24h' }
        );

        // Return user data (excluding password) and token
        const userData = user.toObject();
        delete userData.password;
        delete userData.__v;

        res.json({
            message: 'Login successful',
            user: userData,
            token
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ 
            message: 'Error during login', 
            error: error.message 
        });
    }
});

// Get current user profile
router.get('/me', 
    require('../middleware/auth').authenticateToken, 
    async (req, res) => {
        try {
            const user = await User.findById(req.user.userId)
                .select('-password -__v');
                
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            res.json(user);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            res.status(500).json({ 
                message: 'Error fetching user profile', 
                error: error.message 
            });
        }
    }
);

module.exports = router;
