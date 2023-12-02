const superAdminLogin = require('./superAdminLogin');
const createAdmin = require('./createAdmin');
const updateAdmin = require('./updateAdmin');
const deleteAdmin = require('./deleteAdmin');
const logoutSuperAdmin = require('./logoutSuperAdmin');
const createSuperAdmin = require('./createSuperAdmin');

const adminController = {
  superAdminLogin,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  logoutSuperAdmin,
  createSuperAdmin,
};

module.exports = adminController;
