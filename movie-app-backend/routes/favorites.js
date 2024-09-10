// routes/favorites.js
const express = require('express');
const authMiddleware = require('../middleware/auth'); // Ensure the correct path to the middleware
const User = require('../models/User');

const router = express.Router();

// Add a favorite movie route
router.post('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { movieId } = req.body;
        if (user.favorites.includes(movieId)) {
            return res.status(400).json({ message: 'Movie already in favorites' });
        }

        user.favorites.push(movieId);
        await user.save();

        res.json({ message: 'Movie added to favorites' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
