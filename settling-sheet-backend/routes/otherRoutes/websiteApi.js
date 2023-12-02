const express = require('express');
const router = express.Router();

// // Controllers import
const websiteController = require('../../controllers/WebsiteController');

// // Middlewares import
const { hasPermission } = require('../../middlewares/permission');
const { authenticateUser, verifyModerator } = require('../../middlewares/authentication');

// // Handlers import
const { catchErrors } = require('../../handlers/errorHandlers');

// //_______________________________ Bank create management_______________________________

router
  .route('/create/website-transaction')
  .post(
    authenticateUser,
    verifyModerator,
    hasPermission('createWebsite'),
    catchErrors(websiteController.createWebsiteTransaction)
  );

router
  .route('/create/website')
  .post(
    authenticateUser,
    verifyModerator,
    hasPermission('createWebsite'),
    catchErrors(websiteController.createWebsite)
  );

// //_______________________________ Bank update management_______________________________

router
  .route('/update/website-transaction')
  .put(
    authenticateUser,
    verifyModerator,
    hasPermission('updateWebsite'),
    catchErrors(websiteController.updateWebsiteTransaction)
  );

router
  .route('/update/website')
  .put(
    authenticateUser,
    verifyModerator,
    hasPermission('updateWebsite'),
    catchErrors(websiteController.updateWebsite)
  );

// //_______________________________ Bank read management_______________________________

router
  .route('/get/website-transaction')
  .get(
    authenticateUser,
    verifyModerator,
    hasPermission('readWebsite'),
    catchErrors(websiteController.getWebsiteTransactionList)
  );

router
  .route('/get/website-transaction')
  .get(
    authenticateUser,
    verifyModerator,
    hasPermission('readWebsite'),
    catchErrors(websiteController.getwebsiteList)
  );

module.exports = router;
