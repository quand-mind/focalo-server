import mongoose from 'mongoose';

/**
 * Profile Schema
 * Owned by a user, connects to configurations and pay information.
 */
const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Profile name is required'],
    trim: true,
  },
  type: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    unique: true,
    index: true, // index for quick subdomain/slug routing lookups
    trim: true,
    lowercase: true,
  },
  payInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PayInfo',
  },
  profileConfig: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProfileConfig',
  }
}, {
  timestamps: true,
});

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
