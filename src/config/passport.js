import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.model.js';

// Local Strategy: email/password login
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        // Find user by email, select password which is excluded by default
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect email or password.' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Google OAuth2 Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || 'dummy_client_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy_client_secret',
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists with this googleId
        let user = await User.findOne({ 'authProviders.googleId': profile.id });

        if (user) {
          return done(null, user);
        }

        // Check if user exists with the same email
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;
        
        if (email) {
          user = await User.findOne({ email });
          if (user) {
            // Link google account to existing user
            user.authProviders.googleId = profile.id;
            await user.save();
            return done(null, user);
          }
        }

        // Create new user
        user = await User.create({
          name: profile.displayName || 'Google User',
          email: email || `${profile.id}@dummy.google.com`,
          authProviders: {
            googleId: profile.id,
          },
        });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
