const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');

const updateAdmin = async (req, res) => {
  try {
    let { email, new_email, password } = req.body;
    if (!email)
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Email is not entered.',
      });
    if (!new_email || !password)
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Nothing to update',
      });

    const existingAdmin = await Admin.findOne({ email });

    if (!existingAdmin)
      return res.status(400).json({
        success: false,
        result: null,
        message: 'An account with this email do not exists.',
      });

    const updateObject = {};
    if (password) {
      updateObject.password = Moderator.generateHash(password);
    }

    if (new_email) {
      updateObject.email = new_email;
    }
    const result = await Admin.findOneAndUpdate(
      { email },
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
        message: "Document couldn't be updated correctly",
      });
    }
    return res.status(200).send({
      success: true,
      result: {
        enabled: result.enabled,
        email: result.email,
        role: result.role,
      },
      message: 'Admin document updated correctly',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'there is error', error });
  }
};
module.exports = updateAdmin;
