
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    productName:{
        type:String,
        default:'chicken farm'
    },
    productIcon:{
        type:String,
        default:'CF'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});


const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;