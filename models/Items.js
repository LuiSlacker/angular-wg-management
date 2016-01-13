var mongoose = require('mongoose');

mongoose.model('Item', new mongoose.Schema({
    name: String,
    quantity: {type: Number, default:1},
    price: Number,
    purchased: {type: Boolean, default: false},
    addedby: String,
    purchasedby: String,
    shoppinglist: {type: mongoose.Schema.Types.ObjectId, ref: 'Shoppinglist'}
}));