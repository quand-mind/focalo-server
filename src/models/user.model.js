import mongoose from 'mongoose';

/**
 * User Schema
 * Represents an overarching user of the system.
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    index: true, // index for fast email lookups
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  phone: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    enum: ['admin', 'creator', 'client'],
    default: 'client',
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile', // reference to Profile model
  }
}, {
  timestamps: true, // adds createdAt and updatedAt
});

const User = mongoose.model('User', userSchema);
export default User;
