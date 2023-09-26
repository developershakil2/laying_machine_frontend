const mongoose = require("mongoose");


const BarnSchema  = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    barnPrice:{
        type:Number,
    },
    purchase:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'FishPurchase'
    }],
    barnName:{
        type:String,
        enum:["bascic", "standard", "premium"]
    }
});

const Barns = mongoose.model("Barn", BarnSchema);

module.exports = Barns;