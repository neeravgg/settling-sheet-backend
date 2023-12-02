const mongoose = require('mongoose');

const SuperAdmin = mongoose.model('SuperAdmin');

const logoutAdmin = async (req, res) => {
  try {
    const token = req.cookies.token;
    await SuperAdmin.findOneAndUpdate(
      { _id: req.user.id },
      { $pull: { loggedSessions: token } },
      {
        new: true,
      }
    ).exec();

    res
      .clearCookie('token', {
        maxAge: null,
        sameSite: 'none',
        httpOnly: true,
        secure: true,
        domain: req.hostname,
        Path: '/',
      })
      .json({ isLoggedOut: true });
  } catch (error) {
    res.status(500).json({ success: false, result: null, message: error.message, error: error });
  }
};

module.exports = logoutAdmin;
