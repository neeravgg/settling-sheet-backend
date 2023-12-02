const mongoose = require('mongoose');
const BankAccount = mongoose.model('BankAccount');
const Bank = mongoose.model('Bank');

const createBankAccount = async (req, res) => {
  try {
    let { account_number } = req.body;
    const existingBankAccount = await BankAccount.exists({ account_number });

    if (existingBankAccount)
      return res.status(400).json({
        success: false,
        result: null,
        message: 'An account with this info already exists.',
      });
    req.body.user_id = req.user.id;
    const result = await new BankAccount(req.body).save();
    if (!result) {
      return res.status(403).json({
        success: false,
        result: null,
        message: "document couldn't save correctly",
      });
    }
    return res.status(200).send({
      success: true,
      result,
      message: 'Bank account created',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'there is error', error });
  }
};

const createBankEntry = async (req, res) => {
  try {
    let { bank_name } = req.body;
    const existingBank = await Bank.exists({ bank_name });

    if (existingBank)
      return res.status(400).json({
        success: false,
        result: null,
        message: 'An bank with this info already exists.',
      });

    const result = await new Bank(req.body).save();
    if (!result) {
      return res.status(403).json({
        success: false,
        result: null,
        message: "document couldn't save correctly",
      });
    }
    return res.status(200).send({
      success: true,
      result,
      message: 'Bank entry created',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'there is error', error });
  }
};

module.exports = { createBankAccount, createBankEntry };
