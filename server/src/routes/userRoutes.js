const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');


// Get user profile route - protected
router.get('/profile', authMiddleware, async (req, res) =>{
    try {
        res.json({message: 'Protected profile data access granted', user: req.user});
    } catch (error) {
        res.status(500).json({ error: 'Failed to get profile data' });
    }
});

module.exports = router;