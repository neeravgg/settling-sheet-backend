const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const transactionSchema = new Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    utr: {
      type: String,
      unique: true,
      required: true,
    },
    amount_type: {
      type: String,
      enum: ['DEPOSIT', 'WITHDRAW'],
      default: 'DEPOSIT',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    bonus: {
      type: Number,
    },
    bank_account: {
      type: Number,
      required: true,
    },
    remark: {
      type: String,
    },
    status: {
      type: String,
      enum: ['SUCCESSFUL', 'FAILED'],
      default: 'SUCCESSFUL',
      required: true,
    },
    date_time: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
