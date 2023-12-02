// import environmental variables from our variables.env file
require("dotenv").config();
require("express-async-errors");

const mongoose = require('mongoose');
const path = require('path');
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = require('./app');
const cronTask = require("./utils/cron");
const connectDB = require("./db/connect");



// // Make sure we are running node 7.6+
// const [major, minor] = process.versions.node.split('.').map(parseFloat);
// if (major < 16 || (major === 16 && minor <= 20)) {
//   console.log('Please upgrade your node.js version at least 16.20.2 or greater. 👌\n ');
//   process.exit();
// }
app.set("trust proxy", 1);
app.use(morgan("dev"));

app.use(
  cors({
    origin: "*",
  })
);
app.use(xss());
app.use(mongoSanitize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());
app.use(express.static("./public"));





// const glob = require('glob');


// const modelsPath = path.join(__dirname, 'models');
// glob.sync(`${modelsPath}/*.js`).forEach(function (file) {
//   require(path.resolve(file));
// });

// Start the app
app.set('port', process.env.PORT || 8888);

const start = async () => {
  try {
    await connectDB(process.env.DATABASE);
    app.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`Server is up and running on ${PORT}`);
    });
    cronTask.start();
  } catch (err) {
    console.log(err);
  }
};

start();
