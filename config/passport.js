var LocalStrategy = require('passport-local').Strategy;

var User = require('/models/Users');

module.exports = function(passport){
    passport.use('local-signup', new LocalStrategy({
        userNameField: 'userName',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, userName, password, done){
        process.nextTick(function(){
            User.findOne({'local.userName': userName}, function(err, user){
                if (err) return done(err);
                if (user) {
                    return done(null, false);
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
};