
// modules  ========================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');

// MongoDB models  =================================================
require('./models/WGs');
require('./models/Shoppinglists');

// connect to MongoDB ==============================================
mongoose.connect(process.env.MONGOLAB_URI ||'mongodb://localhost/wg-management', function(err){
    if (err) console.error(err);
    else console.log('MongoDB connected');
});

// Routing =========================================================
var wgs = require('./routes/allWGs');
app.use('/wgs', wgs);

// Server ==========================================================
app.use(express.static(__dirname));

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('wg-management app listening at http://%s:%s', host, port);
});