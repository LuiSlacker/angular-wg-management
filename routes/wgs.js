// modules  ========================================================
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mongoose = require('mongoose');

// MongoDB model  =================================================
require('../models/WGs');
var WG = mongoose.model('WG');
//var Shoppinglist = mongoose.model('Shoppinglist');

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
    var wg = new WG(req.body);
    wg.save(function(err, wg){
        if (err) return next(err);
        res.json(wg);
    })
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

module.exports = router;