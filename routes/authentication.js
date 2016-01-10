// modules  ========================================================
var express = require('express'),
    router = express.Router({mergeParams: true}),
    passport = require('passport');

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/d', // redirect to the secure profile section
    failureRedirect : '/dg' // redirect back to the signup page if there is an error
}));

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/d', // redirect to the secure profile section
    failureRedirect : '/dg' // redirect back to the signup page if there is an error
}));

module.exports = router;