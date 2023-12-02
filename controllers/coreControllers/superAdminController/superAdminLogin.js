const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const SuperAdmin = mongoose.model('SuperAdmin');

const superAdminLogin = async (req, res) => {
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

    const superAdmin = await SuperAdmin.findOne({ email });
    if (!superAdmin)
      return res.status(404).json({
        success: false,
        result: null,
        message: 'No account with this email has been registered.',
      });

    // const isMatch = await bcrypt.compare(password, superAdmin.password);
    // if (!isMatch)
    //   return res.status(403).json({
    //     success: false,
    //     result: null,
    //     message: 'Invalid credentials.',
    //   });

    const token = jwt.sign(
      {
        id: superAdmin._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: req.body.remember ? 365 * 24 + 'h' : '24h' }
    );

    const result = await SuperAdmin.findOneAndUpdate(
      { _id: superAdmin._id },
      { $set: { isLoggedIn: 1 }, $push: { loggedSessions: token } },
      {
        new: false,
      }
    ).exec();

    res.status(200).json({
      success: true,
      data: {
        role: 'super-admin',
        role_tag: '0',
        email: result.email,
        isLoggedIn: result.isLoggedIn > 0 ? true : false,
      },
      token: token,
      message: 'Successfully login super-admin',
    });
  } catch (error) {
    res.status(500).json({ success: false, result: null, message: error.message, error: error });
  }
};

module.exports = superAdminLogin;
