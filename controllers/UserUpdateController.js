const User = require("../models/User.model");
const Transaction = require('../models/Transaction.model.js');

const UserUpdateController = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { balance: newBalance } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
 
    const parsedNewBalance = parseInt(newBalance, 10);
    if (isNaN(parsedNewBalance)) {
      return res.status(400).send("Invalid balance amount");
    }
    await User.findByIdAndUpdate(userId, { $set: { balance: parsedNewBalance } });

    const trans = await Transaction.findOne({ user: userId });
    if (trans.type === 'deposit') {
      if (trans.status !== 'approved') {
        if (user.referralCode !== null && user.referralCode !== '') {
          const amount = trans.amount;
          const referralBonus = amount * 0.05;
          const remainingAmount = amount - referralBonus;
          const refUser = await User.findById(user.referralCode);
          refUser.refBal += referralBonus;

          await User.findByIdAndUpdate(userId, { $set: { balance: parsedNewBalance } });
          await refUser.save();
        }
      }
    }



    

    res.status(200).send("Balance updated successfully");
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update balance");
  }
};

module.exports = UserUpdateController;
