var express = require('express');
var app = express();
var mongoose = require('mongoose');
require('./models/WGs.js');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost/wg-management');
var routes = require('./routes/index');

app.use('/', routes);

app.use(express.static(__dirname));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});