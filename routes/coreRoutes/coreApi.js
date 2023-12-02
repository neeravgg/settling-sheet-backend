const express = require('express');
const router = express.Router();

// // Controllers import
const adminController = require('../../controllers/coreControllers/adminController');
const superAdminController = require('../../controllers/coreControllers/superAdminController');

// // Middlewares import
const { hasPermission } = require('../../middlewares/permission');
const {
  authenticateUser,
  verifySuperAdmin,
  verifyAdmin,
  verifyModerator,
} = require('../../middlewares/authentication');

// // Handlers import
const { catchErrors } = require('../../handlers/errorHandlers');

// //_______________________________ Profiles create management_______________________________

router
  .route('/super-admin/create')
  .post(
    authenticateUser,
    verifySuperAdmin,
    hasPermission('createSuperAdmin'),
    catchErrors(superAdminController.createSuperAdmin)
  );

router
  .route('/admin/create')
  .post(
    authenticateUser,
    verifySuperAdmin,
    hasPermission('createAdmin'),
    catchErrors(superAdminController.createAdmin)
  );
router
  .route('/moderator/create')
  .post(
    authenticateUser,
    verifyAdmin,
    hasPermission('createModerator'),
    catchErrors(adminController.createModerator)
  );

// //_______________________________ Profiles update management_______________________________

router
  .route('/admin/update')
  .put(
    authenticateUser,
    verifySuperAdmin,
    hasPermission('updateAdmin'),
    catchErrors(superAdminController.updateAdmin)
  );
router
  .route('/moderator/update')
  .put(
    authenticateUser,
    verifyAdmin,
    hasPermission('updateModerator'),
    catchErrors(adminController.updateModerator)
  );

// //_______________________________ Profiles delete management_______________________________

router
  .route('/admin/delete')
  .post(
    authenticateUser,
    verifySuperAdmin,
    hasPermission('deleteAdmin'),
    catchErrors(superAdminController.deleteAdmin)
  );
router
  .route('/moderator/delete')
  .post(
    authenticateUser,
    verifyAdmin,
    hasPermission('deleteModerator'),
    catchErrors(adminController.deleteModerator)
  );

module.exports = router;
