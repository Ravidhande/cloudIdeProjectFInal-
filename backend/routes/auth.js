const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');
const { validateEmail, validatePassword, validateName } = require('../middleware/validator');

const API_URL = process.env.SERVER_URL || 'http://localhost:5000';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Helper: Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// Helper: Respond with token and user
const sendToken = (user, statusCode, res) => {
  const token = generateToken(user._id);
  res.status(statusCode).json({
    success: true,
    token,
    user: user.toJSON(),
  });
};

/* ─────────────────────────────────────────────────────
   SIGN UP - Email/Password Registration
   ────────────────────────────────────────────────────── */
router.post('/signup', [validateEmail, validatePassword, validateName], async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    user = await User.create({
      name,
      email,
      password,
      provider: 'email',
    });

    sendToken(user, 201, res);
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: err.message || 'Signup failed' });
  }
});

/* ─────────────────────────────────────────────────────
   SIGN IN - Email/Password Login
   ────────────────────────────────────────────────────── */
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Find user and select password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    sendToken(user, 200, res);
  } catch (err) {
    console.error('Signin error:', err);
    res.status(500).json({ error: err.message || 'Signin failed' });
  }
});

/* ─────────────────────────────────────────────────────
   GOOGLE OAUTH - Login/Register
   ────────────────────────────────────────────────────── */
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(`${CLIENT_URL}?error=Authentication failed`);
    }

    const token = generateToken(req.user._id);
    const user = JSON.stringify(req.user.toJSON());

    res.redirect(`${CLIENT_URL}?token=${token}&user=${encodeURIComponent(user)}`);
  } catch (err) {
    console.error('Google callback error:', err);
    res.redirect(`${CLIENT_URL}?error=${err.message}`);
  }
});

/* ─────────────────────────────────────────────────────
   GITHUB OAUTH - Login/Register
   ────────────────────────────────────────────────────── */
router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email'],
  })
);

router.get('/github/callback', passport.authenticate('github', { session: false }), (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(`${CLIENT_URL}?error=Authentication failed`);
    }

    const token = generateToken(req.user._id);
    const user = JSON.stringify(req.user.toJSON());

    res.redirect(`${CLIENT_URL}?token=${token}&user=${encodeURIComponent(user)}`);
  } catch (err) {
    console.error('GitHub callback error:', err);
    res.redirect(`${CLIENT_URL}?error=${err.message}`);
  }
});

/* ─────────────────────────────────────────────────────
   GET CURRENT USER - Verify Token
   ────────────────────────────────────────────────────── */
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: user.toJSON() });
  } catch (err) {
    console.error('Get me error:', err);
    res.status(401).json({ error: 'Invalid token' });
  }
});

/* ─────────────────────────────────────────────────────
   SIGN OUT
   ────────────────────────────────────────────────────── */
router.post('/signout', (req, res) => {
  res.json({ message: 'Signed out successfully' });
});

/* ─────────────────────────────────────────────────────
   FORGOT PASSWORD
   ────────────────────────────────────────────────────── */
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      message: 'Password reset link sent to your email',
      resetToken, // In production, send this via email
    });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: err.message || 'Request failed' });
  }
});

/* ─────────────────────────────────────────────────────
   VERIFY EMAIL
   ────────────────────────────────────────────────────── */
router.post('/verify-email', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.verified = true;
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (err) {
    console.error('Verify email error:', err);
    res.status(500).json({ error: err.message || 'Verification failed' });
  }
});

module.exports = router;
