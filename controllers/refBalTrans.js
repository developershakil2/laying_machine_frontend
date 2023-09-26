const User = require('../models/User.model');

const refBalTrans = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOne({ _id: userId });

    if (user.refBal > 0) {
      user.balance += user.refBal;
      user.refBal = 0;
      await user.save();
      res.status(200).send("You've claimed your referral bonus.");
    } else {
      res.status(200).send("You don't have any referral bonus to claim.");
    }
    // Call next() outside the if-else block to pass control to the next middleware
    next();
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).send('Something went wrong.');
  }
};

module.exports = refBalTrans;
