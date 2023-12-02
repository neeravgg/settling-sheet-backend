const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');

const deleteAdmin = async (req, res) => {
  try {
    let { email } = req.body;
    if (!email)
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Email is not entered.',
      });

    const existingAdmin = await Admin.findOne({ email });

    if (!existingAdmin)
      return res.status(400).json({
        success: false,
        result: null,
        message: 'An account with this email do not exists.',
      });

    const result = await Admin.findOneAndDelete({ email });

    if (!result) {
      return res.status(403).json({
        success: false,
        result: null,
        message: "Document couldn't be deleted correctly",
      });
    }
    return res.status(200).send({
      success: true,
      message: 'Admin document deleted correctly',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'there is error', error });
  }
};
module.exports = deleteAdmin;
