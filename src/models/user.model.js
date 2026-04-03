import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
  password: {
    type: String,
    select: false, // Prevents password from being returned in queries by default
  },
  authProviders: {
    googleId: {
      type: String,
      sparse: true, // Allows multiple null or undefined values, keeps track if user logged in via Google
    },
    // We can add githubId, facebookId here later if needed
  },
  type: {
    type: String,
    enum: ['admin', 'creator', 'client'],
    default: 'client',
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile', // reference to Profile model
  },
  payInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PayInfo',
  }
}, {
  timestamps: true, // adds createdAt and updatedAt
});

// Middleware: Hash password before saving to the database
userSchema.pre('save', async function () {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password') || !user.password) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// Instance Method: Compare a candidate password with the hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
