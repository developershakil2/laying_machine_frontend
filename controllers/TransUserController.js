const User = require("../models/User.model");

const TransController = async (req, res, next) => {
  try {
    const UserId = req.params.userId;

    const trans = await User.findOne({_id:UserId});
    if (!trans) {
      return res.status(404).send("User not found");
    }
    res.status(200).send(trans);
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports = TransController;
