
// modules  ========================================================
var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    expressSession = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);


// connect to MongoDB ==============================================
mongoose.connect(process.env.MONGOLAB_URI ||'mongodb://localhost/wg-management', function(err){
    if (err) console.error(err);
    else console.log('MongoDB connected');
});

require('./config/passport')(passport);

// Config ==========================================================
//app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
var router = express.Router();
var jsonParser = bodyParser.json();
//app.use(expressSession({secret: 'wg-manager-secret'}));
app.use(passport.initialize());
//app.use(passport.session());

// Routing =========================================================
var wgs = require('./routes/wgs');
var users = require('./routes/users');
app.use('/wgs', wgs);
app.use('/users', users);
var auth = require('./routes/authentication');
app.use('/', auth);

// Chat  ============================================================
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('messageSent', function(msg){
        console.log('message sent from %s: %s ',msg.name, msg.message);
        socket.broadcast.emit('tweet', msg);
    });
});


// Server ==========================================================
app.use(express.static(__dirname));

var serv = server.listen(process.env.PORT || 3000, function () {
    var host = serv.address().address;
    var port = serv.address().port;

    console.log('wg-management app listening at http://%s:%s', host, port);
});