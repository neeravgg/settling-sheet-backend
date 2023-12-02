const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const WebsiteTransactionSchema = new Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    website_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Website',
      required: true,
    },
    opening_balance: {
      type: String,
      required: true,
    },
    remaining_balance: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    sharing: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WebsiteTransaction', WebsiteTransactionSchema);
