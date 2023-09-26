const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
},
fullName:{
    type:String,
    required:true
},
phone:{
    type:String,
    required:true,
    unique:true,
},
password:{
    type:String,
    required:true
},
profilePicture:{
    type:String
},
transactions:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Transaction'
    }
],
lastEarningTimestamp: {
  type: Date,
  default: null, // You can set a default value if needed
},
feed:[
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:'FeedBag',
  }
],
barns:[
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Barn"
  }
],
lastEarnedPointsUpdate: {
    type: Date,
    default: Date.now,
  },
  earningsUpdateInterval: {
    type: Number,
    default: null,
  },
  balance:{
    type:Number,
    default :0
  },
  refBal:{
    type:Number,
    default:0
  },
  referralCode:{
       type:String
  },
  refferedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
createdAt:{
    type:Date,
    default:Date.now
}
});

const User = mongoose.model("User", userSchema);
module.exports = User;
