import mongoose from 'mongoose';

/**
 * PayInfo Schema
 * Holds banking and payout details referencing a profile.
 */
const payInfoSchema = new mongoose.Schema({
  bank: {
    type: String,
    required: [true, 'Bank name is required'],
    trim: true,
  },
  cardNumber: {
    type: String, // using String avoids leading zero drops and handles length
    required: [true, 'Card number is required'],
    trim: true,
  },
  bankId: {
    type: String,
    trim: true,
  }
}, {
  timestamps: true,
});

const PayInfo = mongoose.model('PayInfo', payInfoSchema);
export default PayInfo;
