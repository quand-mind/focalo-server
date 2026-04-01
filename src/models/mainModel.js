import mongoose from 'mongoose';

const mainSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
}, {
  timestamps: true,
});

const Main = mongoose.model('Main', mainSchema);

export default Main;
