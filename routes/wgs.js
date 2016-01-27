// modules  ========================================================
var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    jsonParser = bodyParser.json(),
    mongoose = require('mongoose');

// MongoDB models  =================================================
require('../models/WGs');
require('../models/Users');
var WG = mongoose.model('WG');
var User = mongoose.model('Users');

// WG Routing Parameter ============================================
router.param('wg', function(req, res, next, id){
    WG.findById(id, function(err, wg){
        if (err){
            next(err)
        } else if (!wg) {
            next(new Error('Failed to load WG'));
        } else{
            req.wg = wg;
            next();
        }
    })
});

// WG Routes  ======================================================
router.get('/', function(req, res, next){
    WG.find(function(err, wgs){
        if (err) return next(err);

        res.json(wgs)
    });
});

router.get('/:wg', function(req, res){
    res.json(req.wg);
});

router.post('/', jsonParser, function(req, res, next){
    console.log(req.body);
    var wg = new WG(req.body);
    wg.save(function(err, wg){
        if (err) return next(err);
        res.json(wg);
    })
});

router.put('/:wg', jsonParser, function(req, res, next){
    req.wg.name = req.body.name || req.wg.name;
    req.wg.street = req.body.street || req.wg.street;
    req.wg.city = req.body.city || req.wg.city;

    req.wg.save(function(err, wg){
        if (err) return next(err);
        res.json(wg);
    });
});

router.delete('/:wg', function(req, res, next){
    WG.remove({"_id": req.wg}, function(err){
        if (err) return next(err);
        res.sendStatus(204);
    });
});

// Shoppinglist Routes  ==============================================
var shoppinglistRoutes = require('./shoppinglists');
router.use('/:wg/shoppinglists', shoppinglistRoutes);

// UsersinWgs Routes  ================================================
var membersInWgs = require('./membersInWgs');
router.use('/:wg/members', membersInWgs);


module.exports = router;