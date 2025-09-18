const express = require('express');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @route   POST /api/auth/signup
// @desc    Register user
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    // Basic server-side validations
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    const phoneRegex = /^\+?[0-9]{10,15}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid phone number'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      phoneNumber,
      password
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          points: user.points || 0
        },
        token
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          points: user.points || 0
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        user: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          points: req.user.points || 0
        }
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;

// Google OAuth - Verify ID token and login/signup
router.post('/google', async (req, res) => {
  try {
    const { credential } = req.body;
    const clientId = process.env.GOOGLE_CLIENT_ID;

    if (!credential) {
      return res.status(400).json({ success: false, message: 'Missing Google credential' });
    }
    if (!clientId) {
      return res.status(500).json({ success: false, message: 'Google client not configured' });
    }

    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({ idToken: credential, audience: clientId });
    const payload = ticket.getPayload();

    const email = payload.email;
    const emailVerified = payload.email_verified;
    const name = payload.name || email?.split('@')[0] || 'User';

    if (!email || !emailVerified) {
      return res.status(400).json({ success: false, message: 'Unverified Google account' });
    }

    let user = await User.findOne({ email });
    if (!user) {
      // Create a user with a random password since password is required
      const randomPassword = Math.random().toString(36).slice(-12) + Date.now().toString(36);
      user = new User({ name, email, password: randomPassword });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return res.json({
      success: true,
      message: 'Google login successful',
      data: {
        user: { id: user._id, name: user.name, email: user.email, points: user.points || 0 },
        token
      }
    });
  } catch (error) {
    console.error('Google OAuth error:', error);
    return res.status(500).json({ success: false, message: 'Failed to verify Google login' });
  }
});
