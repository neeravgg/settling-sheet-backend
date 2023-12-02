const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const BankSchema = new Schema(
  {
    bank_name: {
      type: String,
      required: true,
    },
    bank_name_abr: {
      type: String,
      // required: true,
    },
    logo: {
      type: JSON,
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bank', BankSchema);
