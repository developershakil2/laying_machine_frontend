const Transaction = require("../models/Transaction.model");

const TransController = async (req, res, next) => {
  try {
    const transId = req.params.TransId;

    const trans = await Transaction.findOne({_id:transId});
    if (!trans) {
      return res.status(404).send("Transaction not found");
    }
    res.status(200).send(trans);
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};


const referral = async (req, res, next) => {
  try {
    const transId = req.params.TransId;
    const {ref} = req.body;
    const trans = await Transaction.updateOne({_id:transId}, {$set:{refBal:40}}, {new:true});
    if (!trans) {
      return res.status(404).send("Transaction not found");
    }
      if(trans){
        res.status(200).send("referral balance added to the referred person");
        next();
      }else{
        res.send("not found").status(404)
      }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};



const Transic = async (req, res, next) => {
  try {
    const transId = req.params.transId;
    const {upStatus} = req.body;
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transId,
      { $set: { status: upStatus } },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).send("Transaction not found.");
    }

    res.status(200).send("This transaction status changed");
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error.");
  }
};


const Reject = async (req, res, next) => {
  try {
    const transId = req.params.transId;
    const {upStatus} = req.body;
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transId,
      { $set: { status: upStatus } },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).send("Transaction not found.");
    }

    res.status(200).send("This transaction status changed");
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error.");
  }
};

module.exports = {TransController, Transic, Reject, referral};
