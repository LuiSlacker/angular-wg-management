var mongoose = require('mongoose');

mongoose.model('WG', new mongoose.Schema({
    name: String,
    street: String,
    city: String,
    shoppinglists: [{type: mongoose.Schema.Types.ObjectId, ref: 'Shoppinglist'}],
    user: {type: mongoose.Schema.Types.ObjectId, ref:'Users'}
}));