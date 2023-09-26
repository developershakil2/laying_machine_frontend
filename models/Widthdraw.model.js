const mongoose = require("mongoose")



const widthdraw = mongoose.Schema({
    

    widthdraw:{
      type:String,
      
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

}, {timestamps:true})