const mongoose = require('mongoose');
const WebsiteTransaction = mongoose.model('WebsiteTransaction');

const updateWebsiteTransaction = async (req, res) => {
  try {
    const ref_website_id = req.headers['ref_website_id'];
    const existingwebsiteTransaction = await WebsiteTransaction.exists({
      _id: ref_website_id,
      user_id: req.user.id,
    });
    if (!existingwebsiteTransaction)
      return res.status(400).json({
        success: false,
        result: null,
        message: 'An website transaction with this info do not exists.',
      });

    const updateObject = req.body;
    const result = await WebsiteTransaction.findOneAndUpdate(
      { _id: ref_website_id },
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
        message: "document couldn't update correctly",
      });
    }
    return res.status(200).send({
      success: true,
      result,
      message: 'Website transaction updated',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'there is error', error });
  }
};

const updateWebsite = async (req, res) => {
  try {
    const ref_website_id = req.headers['ref_website_id'];

    const updateObject = req.body;
    const result = await BankAccount.findOneAndUpdate(
      { _id: ref_website_id },
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
        message: "document couldn't update correctly",
      });
    }
    return res.status(200).send({
      success: true,
      result,
      message: 'Website updated',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'there is error', error });
  }
};

module.exports = { updateWebsiteTransaction, updateWebsite };
