import mongoose from 'mongoose';

/**
 * Template Schema
 * A layout structure containing pages, created by a specific user.
 */
const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Template name is required'],
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mainPage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Page',
  },
  pages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Page',
  }]
}, {
  timestamps: true,
});

const Template = mongoose.model('Template', templateSchema);
export default Template;
