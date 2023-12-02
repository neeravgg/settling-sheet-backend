const mongoose = require('mongoose');
const Moderator = mongoose.model('Moderator');

const createModerator = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        success: false,
        result: null,
        message: "Email or password fields they don't have been entered.",
      });

    const existingModerator = await Moderator.findOne({ email });

    if (existingModerator)
      return res.status(400).json({
        success: false,
        result: null,
        message: 'An account with this email already exists.',
      });

    let newModerator = new Moderator();
    const passwordHash = newModerator.generateHash(password);
    req.body.password = passwordHash;
    req.body.role = 'moderator';
    req.body.admin = req.user.id;

    const result = await new Moderator(req.body).save();
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
      message: 'Moderator created',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'there is error', error });
  }
};
module.exports = createModerator;
