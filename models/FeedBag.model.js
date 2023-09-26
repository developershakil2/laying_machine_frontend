// models/FeedBag.model.js
const mongoose = require('mongoose');

const feedBagSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fishPurchaseId: { type: mongoose.Schema.Types.ObjectId, ref: 'FishPurchase' },
  expirationDate: { type: Date, required: true },
  quantity: { type: Number, default: 1 }, // You can adjust the quantity as needed
});


const FeedBag = mongoose.model('FeedBag', feedBagSchema);

module.exports = FeedBag;