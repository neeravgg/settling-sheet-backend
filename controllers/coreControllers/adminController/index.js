const adminLogin = require('./adminLogin');
const createModerator = require('./createModerator');
const updateModerator = require('./updateModerator');
const deleteModerator = require('./deleteModerator');
const logoutAdmin = require('./logoutAdmin');

const adminController = {
  adminLogin,
  createModerator,
  updateModerator,
  deleteModerator,
  logoutAdmin,
};

module.exports = adminController;
