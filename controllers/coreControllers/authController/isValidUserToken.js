const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');
const SuperAdmin = mongoose.model('SuperAdmin');
const Admin = mongoose.model('Admin');
const Moderator = mongoose.model('Moderator');

const isValidUserToken = async (req, res, next) => {
  try {
    const { userType } = req.body;
    let isAllowed = false;
    switch (userType) {
      case 'super-admin':
        isAllowed = await SuperAdmin.exists({ _id: req.user.id });
        break;
      case 'admin':
        isAllowed = await Admin.exists({ _id: req.user.id });
        break;
      case 'moderator':
        isAllowed = await Moderator.exists({ _id: req.user.id });
        break;
      default:
        isAllowed = false;
        break;
    }
    if (!isAllowed) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: 'ACCESS DENIED',
      });
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'ACCESS GRANTED',
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      result: null,
      message: error.message,
      error: error,
    });
  }
};

module.exports = isValidUserToken;
