const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const BankAccountSchema = new Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    // account_number: {
    //   type: String,
    //   required: true,
    // },
    // account_name: {
    //   type: String,
    //   required: true,
    // },
    account_type: {
      type: String,
      enum: ['SAVING', 'CURRENT'],
      required: true,
    },
    account_use_type: {
      type: String,
      enum: ['DEPOSIT', 'WITHDRAW', 'BOTH'],
      required: true,
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      required: true,
    },
    total_balance: {
      type: String,
      required: true,
    },
    deposit: {
      type: String,
    },
    withdraw: {
      type: String,
    },
    rent: {
      type: String,
      required: true,
    },
    bank_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Bank',
      required: true,
    },
    linked_phone_number: {
      type: String,
      required: true,
    },

    remark: {
      type: String,
      required: true,
    },
    created_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

BankAccountSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('BankAccount', BankAccountSchema);
