var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/Users');

module.exports = function(passport){
    passport.serializeUser(function(user, done){
        done(null, user);
    });
    passport.deserializeUser(function(id, done){
        User.findById('id', function(err, user){
           done(err, user);
        });
    });
    passport.use('local-signup', new LocalStrategy(
    function(req, userName, password, done){
        console.log(userName);
        console.log(password);
        process.nextTick(function(){
            User.findOne({'local.username': userName}, function(err, user){
                if (err) return done(err);
                if (user) {
                    return done(null, false, {message:'User already exiting.'});
                }
                else {
                    var newUser = new User();
                    newUser.local.userName = userName;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.save(function(err){
                        if (err) throw err;
                        return done(null, newUser);
                    })
                }
            });
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done){
        User.findOne({'local.username': username}, function(err, user){
            if (err) return done(err);
            if (!user) return done(null,false, {message: 'No such user.'});
            if (!user.validPassword(password)) return done(null, false, {message:'Incorrect password.'});
            return done(null, user);
        });
    }));
};