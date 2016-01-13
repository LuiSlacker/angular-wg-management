var LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose');

require('../models/Users');
var User = mongoose.model('Users');

/*module.exports = function(passport) {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (id, done) {
        Users.findById(id, function (err, user) {
            done(err, user);
        });
    });
    passport.use(new LocalStrategy(function (username, password, done) {
        console.log(username);
        console.log(password);
        process.nextTick(function () {
            Users.findOne({'local.username': username}, function (err, user) {
                if (err) {
                    console.log('err');
                    return done(err);
                }
                if (!user) {
                    console.log('no user');
                    return done(null, false);
                }
                console.log(user.local.password);
                if (user.local.password != password) {
                    console.log(password + ' is wrong password');
                    return done(null, false);
                }
                return done(null, user);
            });
        });
    }));
};*/

module.exports = function(passport){
    passport.serializeUser(function(user, done){
        console.log(user);
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done){
        console.log(id);
        User.findById(id, function(err, user){
           done(err, user);
        });
    });
    passport.use('local-signup', new LocalStrategy(
        function(userName, password, done){
            console.log(userName);
            console.log(password);
            process.nextTick(function(){
                User.findOne({'local.username': userName}, function(err, user){
                    if (err) {
                        console.log('Err in Signup');
                        return done(err);
                    }
                    if (user) {
                        console.log('User already exists.');
                        return done(null, false, {message:'User already exiting.'});
                    }
                    else {
                        console.log('ALl Good');
                        var newUser = new User();
                        newUser.local.username = userName;
                        newUser.local.password = newUser.generateHash(password);
                        console.log(newUser.local.username);
                        console.log(newUser.local.password);
                        newUser.save(function(err){
                            if (err) {
                                console.log('err saving');
                                throw err;
                            }
                            console.log('ok');
                            return done(null, newUser);
                        })
                    }
                });
            });
    }));

    passport.use('local-login', new LocalStrategy( function(username, password, done){
        console.log('Blubb');
        User.findOne({'local.username': username}, function(err, user){
            if (err) return done(err);
            if (!user) {
                console.log('no such user!');
                return done(null,false, {message: 'No such user.'});
            }
            if (!user.validPassword(password)) {
                console.log('incorrrect pwd!');
                return done(null, false, {message:'Incorrect password.'});
            }
            return done(null, user);
        });
    }));
};

/*module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // code for login (use('local-login', new LocalStategy))
    // code for signup (use('local-signup', new LocalStategy))

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

            // pull in our app id and secret from our auth.js file
            clientID        : configAuth.facebookAuth.clientID,
            clientSecret    : configAuth.facebookAuth.clientSecret,
            callbackURL     : configAuth.facebookAuth.callbackURL

        },

        // facebook will send back the token and profile
        function(token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function() {

                // find the user in the database based on their facebook id
                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found, then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        var newUser            = new User();

                        // set all of the facebook information in our user model
                        newUser.facebook.id    = profile.id; // set the users facebook id
                        newUser.facebook.token = token; // we will save the token that facebook provides to the user
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                        // save our user to the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }

                });
            });

        }));

};*/
