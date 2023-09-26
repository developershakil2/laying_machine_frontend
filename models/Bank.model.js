const mongoose = require("mongoose");


const BankSchema  = new mongoose.Schema({
    bankNumber:{
        type:Number,
        required:true,
    },
    bankAccountHolderName:{
        type:String,
        required:true,
    },
    bankName:{
        type:String,
        required:true
    }
});


const Bank =  mongoose.model("Bank", BankSchema);

module.exports = Bank;