const mongoose = require('mongoose');
const BankAccount = mongoose.model('BankAccount');
const Bank = mongoose.model('Bank');

const updateBankAccount = async (req, res) => {
  try {
    const { ref_bank_id } = req.body;

    const existingBankAccount = await BankAccount.exists({
      _id: ref_bank_id,
      user_id: req.user.id,
    });

    if (!existingBankAccount)
      return res.status(400).json({
        success: false,
        result: null,
        message: 'An bank account with this info do not exists.',
      });
    const updateObject = req.body;
    const result = await BankAccount.findOneAndUpdate(
      { _id: ref_bank_id },
      {
        $set: {
          updateObject,
        },
      },
      { new: false }
    );
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
      message: 'Bank account update',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'there is error', error });
  }
};

const updateBankEntry = async (req, res) => {
  try {
    const ref_bank_id = req.headers['ref_bank_id'];

    const updateObject = req.body;
    const result = await BankAccount.findOneAndUpdate(
      { _id: ref_bank_id },
      {
        $set: {
          updateObject,
        },
      },
      { new: false }
    );
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
      message: 'Bank entry updated',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'there is error', error });
  }
};

module.exports = { updateBankAccount, updateBankEntry };
