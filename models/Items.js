var mongoose = require('mongoose');

mongoose.model('Item', new mongoose.Schema({
    name: String,
    price: int,
    purchased: boolean,
    shoppinglist: {type: mongoose.Schema.types.ObjectId, ref: 'Shoppinglist'}
}));