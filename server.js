
// modules  ========================================================
var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    //path = require('path'),
    passport = require('passport'),
    expressSession = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');


// connect to MongoDB ==============================================
mongoose.connect(process.env.MONGOLAB_URI ||'mongodb://localhost/wg-management', function(err){
    if (err) console.error(err);
    else console.log('MongoDB connected');
});

require('./config/passport')(passport);

// Config ==========================================================
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
var router = express.Router();
var jsonParser = bodyParser.json();
app.use(expressSession({secret: 'wg-manager-secret'}));
app.use(passport.initialize());
app.use(passport.session());

// Routing =========================================================
var wgs = require('./routes/wgs');
app.use('/wgs', wgs);
var auth = require('./routes/authentication');
app.use('/', auth);


// Server ==========================================================
app.use(express.static(__dirname));

var server = app.listen(process.env.PORT || 3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('wg-management app listening at http://%s:%s', host, port);
});