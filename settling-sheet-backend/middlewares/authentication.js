// const CustomError = require('../errors');
const mongoose = require('mongoose');
const { isTokenValid } = require('./utils/jwt');
const { StatusCodes } = require('http-status-codes');
const SuperAdmin = mongoose.model('SuperAdmin');
const Admin = mongoose.model('Admin');
const Moderator = mongoose.model('Moderator');

const authenticateUser = (req, res, next) => {
  try {
    const accessToken = req.headers['authorization'];
    const bearerToken = accessToken.split(' ')[1];
    if (accessToken) {
      const payload = isTokenValid(bearerToken);
      if (!payload) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'PL:Invalid Token' });
      }
      req.user = payload;
      req.user.token = bearerToken;
      return next();
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Invalid Token' });
    }
  } catch (error) {
    console.error(`Authentication Invalid`);
  }
};

const isAuthenticated = (req, res, next) => {
  let checker = req.user.userId === req?.profile?._id.toString();
  if (!checker) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: 'ACCESS DENIED',
    });
  }
  next();
};

const verifySuperAdmin = async (req, res, next) => {
  const exist = await SuperAdmin.exists({ _id: req.user.id });

  if (exist) {
    req.role = 'superAdmin';
    next();
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'ACCESS DENIED' });
  }
};
const verifyAdmin = async (req, res, next) => {
  const exist = await Admin.exists({ _id: req.user.id });

  if (exist) {
    req.role = 'admin';
    next();
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'ACCESS DENIED' });
  }
};
const verifyModerator = async (req, res, next) => {
  const exist = await Moderator.exists({ _id: req.user.id });

  if (exist) {
    req.role = 'moderator';
    next();
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'ACCESS DENIED' });
  }
};

module.exports = {
  authenticateUser,
  isAuthenticated,
  verifySuperAdmin,
  verifyAdmin,
  verifyModerator,
};
