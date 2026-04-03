import express from 'express';
import passport from 'passport';
import { register, login, googleCallback } from '../controllers/auth.controller.js';

const router = express.Router();

// Local Registration Route
router.post('/register', register);

// Local Login Route (using passport-local)
router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  login
);

// Google OAuth Initial Route
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

// Google OAuth Callback Route
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/api/auth/failed' }),
  googleCallback
);

// Fallback for failed authentication
router.get('/failed', (req, res) => {
  res.status(401).json({ message: 'Authentication Failed' });
});

export default router;
