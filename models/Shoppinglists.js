var mongoose = require('mongoose');

mongoose.model('Shoppinglist', new mongoose.Schema({
    name: String,
    date: {type: Date, default: Date.now},
    wg: {type: mongoose.Schema.Types.ObjectId, ref: 'WG'},
    items: [{type: mongoose.Schema.Types.ObjectId, ref:'Item'}]
}));