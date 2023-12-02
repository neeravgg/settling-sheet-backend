const mongoose = require('mongoose');
const BankAccount = mongoose.model('BankAccount');
const Bank = mongoose.model('Bank');

const getBankactivityList = async (req, res) => {
  try {
    const active_List = await BankAccount.aggregate([
      { $match: { status: 'ACTIVE', user_id: new mongoose.Types.ObjectId(req.user.id) } },
      { $sort: { lastUpdated: -1 } },
      { $limit: 6 },
      {
        $lookup: {
          from: 'banks', // Use the actual name of the collection
          localField: 'bank_id',
          foreignField: '_id',
          as: 'bankData',
        },
      },
      {
        $project: {
          _id: 0,
          bank_data: { $arrayElemAt: ['$bankData', 0] },
        },
      },
    ]);

    const inactive_List = await BankAccount.aggregate([
      { $match: { status: 'INACTIVE', user_id: new mongoose.Types.ObjectId(req.user.id) } },
      { $sort: { lastUpdated: -1 } },
      { $limit: 6 },
      {
        $lookup: {
          from: 'banks', // Use the actual name of the collection
          localField: 'bank_id',
          foreignField: '_id',
          as: 'bankData',
        },
      },
      {
        $project: {
          _id: 0,
          bank_data: { $arrayElemAt: ['$bankData', 0] },
        },
      },
    ]);
    const result = {
      active_List,
      inactive_List,
    };
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBankAccountList = async (req, res) => {
  try {
    const by_bank_id = req.headers['by_bank_id'];
    const matchQuery = {
      user_id: new mongoose.Types.ObjectId(req.user.id),
    };

    if (by_bank_id) {
      matchQuery['bank_id'] = new mongoose.Types.ObjectId(by_bank_id);
    }
    const result = await BankAccount.aggregate([
      {
        $match: matchQuery,
      },
      { $sort: { lastUpdated: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'banks', // Use the actual name of the collection
          localField: 'bank_id',
          foreignField: '_id',
          as: 'bank_data',
        },
      },
      {
        $unwind: '$bank_data',
      },
    ]);

    res.json({
      result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBankList = async (req, res) => {
  try {
    const result = await Bank.aggregate([
      { $sort: { lastUpdated: -1 } },
      // { $limit: 10 },
    ]);

    res.json({
      result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getBankactivityList, getBankAccountList, getBankList };
