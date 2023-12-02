const mongoose = require('mongoose');
const Moderator = mongoose.model('Moderator');

const updateModerator = async (req, res) => {
  try {
    let { email, new_email, password } = req.body;
    if (!email)
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Email is not entered.',
      });
    if (!new_email && !password)
      return res.status(400).json({
        success: false,
        result: null,
        message: 'Nothing to update',
      });

    const existingModerator = await Moderator.findOne({ email });

    if (!existingModerator)
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
    const result = await Moderator.findOneAndUpdate(
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
        email: new_email || result.email,
      },
      message: 'Moderator document updated correctly',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'there is error', error });
  }
};
module.exports = updateModerator;
