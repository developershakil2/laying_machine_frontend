const mongoose = require("mongoose");

const fishPurchaseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productName: { type: String, },
    productIcon: { type: String,  },
    buyAmount: { type: Number, required: true },
    earnings: { type: Number, default: 0 },
    barns:{type:mongoose.Schema.Types.ObjectId, ref:'Barn'},
    runningEarnings: { type: Number, default: 0 },
    startTime: { type: Number, default: Date.now },
    purchaseDate: { type: Date, default: Date.now },
    isWithdrawn: { type: Boolean, default: false },
    isbuy: { type: Boolean, default: false },
    withdrawalDate: { type: Date, default: null },
    lastEarningDate: { type: Date, default: null },
     isClaim:{type:Boolean, default:false},
     earningPaused: { type: Boolean, default: true },
     feedBag: { type: mongoose.Schema.Types.ObjectId, ref: 'FeedBag' }, // Reference to the associated feed bag
     barnName:{
      type:String,
      enum:["bascic", "standard", "premium"]
  }
    },
  { timestamps: true }
);

const FishPurchase = mongoose.model("FishPurchase", fishPurchaseSchema);

module.exports = FishPurchase;
