import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Helper to generate a token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

/**
 * @desc    Register a new user manually
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Local login handler
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = (req, res) => {
  // Check if passport successfully populated req.user
  if (!req.user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const user = req.user;
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};

/**
 * @desc    Google OAuth2 Success Callback
 * @route   GET /api/auth/google/callback
 * @access  Public
 */
export const googleCallback = (req, res) => {
  if (!req.user) {
    return res.redirect('/api/auth/failed');
  }

  // Generate a token for the user
  const token = generateToken(req.user._id);
  
  // Send back the token in JSON.
  // Note: For a typical frontend (React/Vue), you'd send an HTTP redirect back to your app with the token
  // example: res.redirect(`http://localhost:3000/auth-success?token=${token}`);
  res.status(200).json({
    message: 'Google Login Successful',
    token, // The frontend should store this token
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email
    }
  });
};
