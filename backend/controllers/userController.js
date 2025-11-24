const User = require('../models/User');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// POST /api/v1/user/signup
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Basic input validation
        if (!username || !email || !password) {
            return res.status(400).json({ status: false, message: 'username, email and password are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ email }, { username }] 
        });
        
        if (existingUser) {
            return res.status(400).json({ 
                status: false, 
                message: 'User already exists with this email or username' 
            });
        }

        // Create new user
        const user = new User({ username, email, password });
        await user.save();

        res.status(201).json({
            message: 'User created successfully.',
            user_id: user._id
        });
    } catch (error) {
        // Handle Mongoose validation errors more clearly
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ status: false, message: 'Validation error', errors: messages });
        }

        // Duplicate key error (unique fields)
        if (error.code === 11000) {
            const fields = Object.keys(error.keyValue || {}).join(', ');
            return res.status(400).json({ status: false, message: `Duplicate value for field(s): ${fields}` });
        }

        res.status(500).json({ 
            status: false, 
            message: 'Error creating user', 
            error: error.message 
        });
    }
};

// POST /api/v1/user/login
const login = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Find user by email or username
        const user = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (!user) {
            return res.status(400).json({ 
                status: false, 
                message: 'Invalid Username and password' 
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ 
                status: false, 
                message: 'Invalid Username and password' 
            });
        }

        // Sign JWT and return to client
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || 'change_this_secret',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful.',
            token
        });
    } catch (error) {
        res.status(500).json({ 
            status: false, 
            message: 'Error logging in', 
            error: error.message 
        });
    }
};

module.exports = { signup, login };