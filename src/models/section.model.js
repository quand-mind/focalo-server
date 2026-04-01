import mongoose from 'mongoose';

/**
 * Section Schema
 * A flexible building block used within a page's layout.
 */
const sectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Section name is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  layoutDesign: {
    type: String,
    trim: true,
  },
  action: {
    type: String,
    trim: true,
  }
}, {
  timestamps: true,
});

const Section = mongoose.model('Section', sectionSchema);
export default Section;
