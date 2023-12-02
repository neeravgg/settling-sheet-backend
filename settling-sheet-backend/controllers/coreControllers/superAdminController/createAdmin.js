const mongoose = require('mongoose');
const Admin = mongoose.model('Admin');

const createAdmin = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        success: false,
        result: null,
        message: "Email or password fields they don't have been entered.",
      });

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin)
      return res.status(400).json({
        success: false,
        result: null,
        message: 'An account with this email already exists.',
      });

    let newAdmin = new Admin();
    const passwordHash = newAdmin.generateHash(password);
    req.body.password = passwordHash;
    req.body.role = 'admin';
    req.body.super_admin = req.user.id;

    const result = await new Admin(req.body).save();
    if (!result) {
      return res.status(403).json({
        success: false,
        result: null,
        message: "document couldn't save correctly",
      });
    }
    return res.status(200).send({
      success: true,
      result: {
        enabled: true,
        email: result.email,
        role: result.role,
      },
      message: 'Admin created',
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'there is error', error });
  }
};
module.exports = createAdmin;
