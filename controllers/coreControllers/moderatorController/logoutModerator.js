const mongoose = require('mongoose');

const Moderator = mongoose.model('Moderator');

const logoutModerator = async (req, res) => {
  try {
    await Moderator.findOneAndUpdate(
      { _id: req.user.id },
      { $pull: { loggedSessions: req.user.token } },
      {
        new: true,
      }
    ).exec();

    res.json({ isLoggedOut: true });
  } catch (error) {
    res.status(500).json({ success: false, result: null, message: error.message, error: error });
  }
};

module.exports = logoutModerator;
