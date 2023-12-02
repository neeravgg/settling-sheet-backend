const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const WebsiteSchema = new Schema(
  {
    website_name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Website', WebsiteSchema);
