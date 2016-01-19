// modules  ========================================================
var express = require('express'),
    router = express.Router({mergeParams: true}),
    passport = require('passport');

router.post('/login', passport.authenticate('local-login'), function(req, res){
    res.status(200).json(req.user);
});

router.post('/signup', passport.authenticate('local-signup'), function(req, res){
    res.status(200).json(req.user);
});

router.get('/auth/facebook', passport.authenticate('facebook'));

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/callback', passport.authenticate('facebook'),function(req, res) {
        res.status(200).json(req.user);
    });

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

module.exports = router;