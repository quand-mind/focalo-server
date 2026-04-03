import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import connectDB from './config/db.js';
import './config/passport.js'; // initialize passport config
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import profileRoutes from './routes/profile.routes.js';
import payInfoRoutes from './routes/payInfo.routes.js';
import profileConfigRoutes from './routes/profileConfig.routes.js';
import templateRoutes from './routes/template.routes.js';
import pageRoutes from './routes/page.routes.js';
import sectionRoutes from './routes/section.routes.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Initialize Passport middleware
app.use(passport.initialize());

// Main API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/pay-info', payInfoRoutes);
app.use('/api/profile-configs', profileConfigRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/sections', sectionRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
