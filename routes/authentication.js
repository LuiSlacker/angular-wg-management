// modules  ========================================================
var express = require('express'),
    router = express.Router({mergeParams: true}),
    passport = require('passport');

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect : '/dg'
}));

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect : '/dg'
}));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

module.exports = router;