const express = require('express');
const router = express.Router();

// // Controllers import
const bankController = require('../../controllers/BankController');

// // Middlewares import
const { hasPermission } = require('../../middlewares/permission');
const { authenticateUser, verifyModerator } = require('../../middlewares/authentication');

// // Handlers import
const { catchErrors } = require('../../handlers/errorHandlers');

// //_______________________________ Bank create management_______________________________

router
  .route('/create/bank-account')
  .post(
    authenticateUser,
    verifyModerator,
    hasPermission('createBank'),
    catchErrors(bankController.createBankAccount)
  );

router
  .route('/create/bank')
  .post(
    authenticateUser,
    verifyModerator,
    hasPermission('createBank'),
    catchErrors(bankController.createBankEntry)
  );

// //_______________________________ Bank update management_______________________________

router
  .route('/update/bank-account')
  .put(
    authenticateUser,
    verifyModerator,
    hasPermission('updateBank'),
    catchErrors(bankController.updateBankAccount)
  );

router
  .route('/update/bank')
  .put(
    authenticateUser,
    verifyModerator,
    hasPermission('updateBank'),
    catchErrors(bankController.updateBankEntry)
  );

// //_______________________________ Bank read management_______________________________

router
  .route('/get/bank-activity-list')
  .get(
    authenticateUser,
    verifyModerator,
    hasPermission('readBank'),
    catchErrors(bankController.getBankactivityList)
  );

router
  .route('/get/bank-account-list')
  .get(
    authenticateUser,
    verifyModerator,
    hasPermission('readBank'),
    catchErrors(bankController.getBankAccountList)
  );

router
  .route('/get/bank-list')
  .get(
    authenticateUser,
    verifyModerator,
    hasPermission('readBank'),
    catchErrors(bankController.getBankList)
  );

module.exports = router;
