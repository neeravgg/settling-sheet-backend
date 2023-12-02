const mongoose = require('mongoose');

const SuperAdmin = mongoose.model('SuperAdmin');

const logoutSuperAdmin = async (req, res) => {
  try {
    await SuperAdmin.findOneAndUpdate(
      { _id: req.user.id },
      { $pull: { loggedSessions: req.user.token } },
      {
        new: true,
      }
    ).exec();

    res.json({ isLoggedOut: true, message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ success: false, result: null, message: error.message, error: error });
  }
};

module.exports = logoutSuperAdmin;
