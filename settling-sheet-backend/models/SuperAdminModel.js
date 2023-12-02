const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const bcrypt = require('bcryptjs');

const superAdminSchema = new Schema(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      lowercase: true,
      required: true,
    },
    isLoggedIn: { type: Number },
    loggedSessions: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// superAdminSchema.plugin(require('mongoose-autopopulate'));

// generating a hash
superAdminSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(), null);
};

// checking if password is valid
superAdminSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('SuperAdmin', superAdminSchema);
