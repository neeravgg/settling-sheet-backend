const mongoose = require('mongoose');
const WebsiteTransaction = mongoose.model('WebsiteTransaction');
const Website = mongoose.model('Website');

const createWebsiteTransaction = async (req, res) => {
  try {
    req.body.user_id = req.user.id;
    const result = await new WebsiteTransaction(req.body).save();
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
      message: 'Website transaction entry created',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'there is error', error });
  }
};

const createWebsite = async (req, res) => {
  try {
    const { website_name } = req.body;
    const existingWebsite = await Bank.exists({ website_name });

    if (existingWebsite)
      return res.status(400).json({
        success: false,
        result: null,
        message: 'An bank with this info already exists.',
      });

    const result = await new Website(req.body).save();
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
      message: 'Website entry created',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'there is error', error });
  }
};

module.exports = { createWebsiteTransaction, createWebsite };
