const express = require('express');

const router = express.Router();

const { catchErrors } = require('../../handlers/errorHandlers');

const superAdminController = require('../../controllers/coreControllers/superAdminController');
const adminController = require('../../controllers/coreControllers/adminController');
const moderatorController = require('../../controllers/coreControllers/moderatorController');
const authController = require('../../controllers/coreControllers/authController');

const { authenticateUser } = require('../../middlewares/authentication');

// loginroutes
router.route('/login/super-admin').post(catchErrors(superAdminController.superAdminLogin));
router.route('/login/admin').post(catchErrors(adminController.adminLogin));
router.route('/login/moderator').post(catchErrors(moderatorController.moderatorLogin));

//verify routes
router.route('/verify/user').post(authenticateUser, catchErrors(authController.isValidUserToken));

// logout route
router
  .route('/logout/super-admin')
  .post(authenticateUser, catchErrors(superAdminController.logoutSuperAdmin));
router.route('/logout/admin').post(authenticateUser, catchErrors(adminController.logoutAdmin));
router
  .route('/logout/moderator')
  .post(authenticateUser, catchErrors(moderatorController.logoutModerator));

module.exports = router;
