const mongoose = require("mongoose");
const CustomError = require("../errors");

const connectDB = (url) => {
//   if (!url)
//     throw new .BadRequestError(
//       "Please provide db connection string"
//     );

  return mongoose.connect(url);
};

module.exports = connectDB;
