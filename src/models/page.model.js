import mongoose from 'mongoose';

/**
 * Page Schema
 * Represents a discrete URL/view built from various sections.
 */
const pageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Page name is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    index: true,
    trim: true,
  },
  sections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
  }]
}, {
  timestamps: true,
});

const Page = mongoose.model('Page', pageSchema);
export default Page;
