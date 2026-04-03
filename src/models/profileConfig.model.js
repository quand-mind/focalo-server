import mongoose from 'mongoose';

/**
 * ProfileConfig Schema
 * Represents appearance, layout customizations, and visual settings.
 */
const profileConfigSchema = new mongoose.Schema({
  logo: {
    type: String,
    trim: true,
  },
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template',
  },
  colors: {
    type: [String],
    default: [],
  },
  fonts: {
    type: [String],
    default: [],
  },
  customSettings: {
    type: Map,
    of: String, // key-value pairs for dynamic layout config
  },
  pages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Page',
  }]
}, {
  timestamps: true,
});

const ProfileConfig = mongoose.model('ProfileConfig', profileConfigSchema);
export default ProfileConfig;
