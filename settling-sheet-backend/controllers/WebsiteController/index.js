const createWebsiteController = require('./createWebsiteController');
const getWebsiteController = require('./getWebsiteController');
const updateWebsiteController = require('./updateWebsiteController');

const websiteController = {
  ...createWebsiteController,
  ...getWebsiteController,
  ...updateWebsiteController,
};

module.exports = websiteController;
