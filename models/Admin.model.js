const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        required:true,
        type:String,
    }
})

const AdminSchem = mongoose.model('Admin', adminSchema);


module.exports = AdminSchem;