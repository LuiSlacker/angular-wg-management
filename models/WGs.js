var mongoose = require('mongoose');

mongoose.model('WG', new mongoose.Schema({
    name: String,
    street: String,
    city: String
}));