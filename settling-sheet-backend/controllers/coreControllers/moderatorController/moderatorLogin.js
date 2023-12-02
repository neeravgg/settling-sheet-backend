const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const Moderator = mongoose.model('Moderator');

const moderatorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const objectSchema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().required(),
    });

    const { error, value } = objectSchema.validate({ email, password });
    if (error) {
      return res.status(409).json({
        success: false,
        result: null,
        error: error,
        message: 'Invalid/Missing credentials.',
        errorMessage: error.message,
      });
    }

    const moderator = await Moderator.findOne({ email });
    if (!moderator)
      return res.status(404).json({
        success: false,
        result: null,
        message: 'No account with this email has been registered.',
      });

    const isMatch = await bcrypt.compare(password, moderator.password);
    if (!isMatch)
      return res.status(403).json({
        success: false,
        result: null,
        message: 'Invalid credentials.',
      });

    const token = jwt.sign(
      {
        id: moderator._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: req.body.remember ? 365 * 24 + 'h' : '24h' }
    );

    const result = await Moderator.findOneAndUpdate(
      { _id: moderator._id },
      { $set: { isLoggedIn: 1 }, $push: { loggedSessions: token } },
      {
        new: true,
      }
    ).exec();

    res.status(200).json({
      success: true,
      data: {
        role: 'moderator',
        role_tag: '2',
        email: result.email,
        isLoggedIn: result.isLoggedIn > 0 ? true : false,
      },
      token: token,
      message: 'Successfully login moderator',
    });
  } catch (error) {
    res.status(500).json({ success: false, result: null, message: error.message, error: error });
  }
};

module.exports = moderatorLogin;
