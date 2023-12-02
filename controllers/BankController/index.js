const createBankController = require('./createBankController');
const getBankController = require('./getBankController');
const updateBankController = require('./updateBankController');

const bankController = {
  ...createBankController,
  ...getBankController,
  ...updateBankController,
};

module.exports = bankController;
