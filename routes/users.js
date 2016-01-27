// modules  ========================================================
var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    jsonParser = bodyParser.json(),
    mongoose = require('mongoose');

// MongoDB model  =================================================
require('../models/Users');
var usermodel = mongoose.model('Users');

// WG Routing Parameter ============================================
router.param('user', function(req, res, next, id){
	console.log('In users.js router.param');
    usermodel.findById(id, function(err, user){
        if (err){
            next(err)
        } else if (!user) {
            next(new Error('Failed to load User'));
        } else{
            req.user = user;
            next();
        }
    })
});

// User Routes  ======================================================
router.put('/:user',  jsonParser, function(req, res){
    console.log(req.body);
    req.user.local.username = req.body.username || req.user.local.username;
    req.user.local.password = (req.body.password)? req.user.generateHash(req.body.password) : req.user.local.password;
    req.user.save(function(err, user){
        if (err) return next(err);
        res.json(user);
    });
});

module.exports = router;