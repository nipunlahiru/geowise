const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Middleware to verify JWT token
router.use(auth);

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const { username, email, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.userId);

    // Update username if provided
    if (username) {
      user.username = username;
    }

    // Update email if provided
    if (email) {
      user.email = email;
    }

    // Update password if provided
    if (currentPassword && newPassword) {
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }
      user.password = newPassword;
    }

    await user.save();
    const updatedUser = await User.findById(user._id).select('-password');
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

// Delete user account
router.delete('/profile', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.userId);
    res.json({ message: 'User account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting account', error: error.message });
  }
});

// Get user's favorite countries
router.get('/favorites', async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('favoriteCountries');
    res.json(user.favoriteCountries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites', error: error.message });
  }
});

// Add country to favorites
router.post('/favorites', async (req, res) => {
  try {
    const { countryCode } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user.favoriteCountries.includes(countryCode)) {
      user.favoriteCountries.push(countryCode);
      await user.save();
    }

    res.json(user.favoriteCountries);
  } catch (error) {
    res.status(500).json({ message: 'Error adding favorite', error: error.message });
  }
});

// Remove country from favorites
router.delete('/favorites/:countryCode', async (req, res) => {
  try {
    const { countryCode } = req.params;
    const user = await User.findById(req.user.userId);

    user.favoriteCountries = user.favoriteCountries.filter(code => code !== countryCode);
    await user.save();

    res.json(user.favoriteCountries);
  } catch (error) {
    res.status(500).json({ message: 'Error removing favorite', error: error.message });
  }
});

// Logout (invalidate token)
router.post('/logout', async (req, res) => {
  try {
    // In a real application, you might want to:
    // 1. Add the token to a blacklist
    // 2. Clear any session data
    // 3. Perform other cleanup tasks
    
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out', error: error.message });
  }
});

module.exports = router; 