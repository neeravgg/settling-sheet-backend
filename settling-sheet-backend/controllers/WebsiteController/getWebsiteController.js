const mongoose = require('mongoose');
const WebsiteTransaction = mongoose.model('WebsiteTransaction');

const getWebsiteTransactionList = async (req, res) => {
  try {
    const result = await WebsiteTransaction.aggregate([
      { $match: { user_id: req.user.id } },
      { $sort: { lastUpdated: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'Website',
          localField: 'website_id',
          foreignField: '_id',
          as: 'websiteData',
        },
      },
    ]);

    res.json({
      result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getwebsiteList = async (req, res) => {
  try {
    const result = await WebsiteTransaction.aggregate([
      { $match: { user_id: req.user.id } },
      { $sort: { lastUpdated: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'Website',
          localField: 'website_id',
          foreignField: '_id',
          as: 'websiteData',
        },
      },
    ]);

    res.json({
      result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getwebsiteList, getWebsiteTransactionList };
