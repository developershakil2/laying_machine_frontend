const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  proofImg:{
    type:String,
   
  }, 
  bank:{  
    type:Number,

  },
  bankName:{
    type:String
  },
  des:{
    type:String
  },
  type: {
    type: String,
    enum: ["deposit", "withdraw"],
    required: true
  },
  status: {     
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
