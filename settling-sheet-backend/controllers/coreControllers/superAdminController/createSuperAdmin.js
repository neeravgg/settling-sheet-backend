const mongoose = require('mongoose');
const SuperAdmin = mongoose.model('SuperAdmin');

const createSuperAdmin = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        success: false,
        result: null,
        message: "Email or password fields they don't have been entered.",
      });

    const existingSuperAdmin = await SuperAdmin.findOne({ email });

    if (existingSuperAdmin)
      return res.status(400).json({
        success: false,
        result: null,
        message: 'An account with this email already exists.',
      });

    let newSuperAdmin = new SuperAdmin();
    const passwordHash = newSuperAdmin.generateHash(password);
    req.body.password = passwordHash;
    req.body.role = 'super-admin';
    req.body.admin = req.user.id;

    const result = await new SuperAdmin(req.body).save();
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
        enabled: result.enabled,
        email: result.email,
        role: result.role,
      },
      message: 'Super admin created',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'there is error', error });
  }
};
module.exports = createSuperAdmin;
