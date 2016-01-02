// modules  ========================================================
var express = require('express'),
    router = express.Router({mergeParams: true}),
    bodyParser = require('body-parser'),
    jsonParser = bodyParser.json(),
    mongoose = require('mongoose');

// MongoDB model  ==================================================
require('../models/Shoppinglists');
var Shoppinglist = mongoose.model('Shoppinglist');

// Shoppinglist Routing Parameter  ==================================
router.param('shoppinglist', function(req, res, next, id){
    Shoppinglist.findById(id, function(err, shoppinglist){
        if (err) {
            next(err);
        } else if (!shoppinglist){
            next(new Error('Failed to load Shoppinglist'));
        } else {
            req.shoppinglist = shoppinglist;
            next();
        }
    });
});

// Shoppinglist Routes  ==============================================
router.get('/', function(req, res){
    req.wg.populate('shoppinglists', function(err, wg){
        res.json(wg.shoppinglists);
    });
});

router.get('/:shoppinglist', function(req, res, next){
    res.json(req.shoppinglist);
});

router.post('/', jsonParser, function(req, res, next){
    var newShoppinglist = new Shoppinglist(req.body);
    newShoppinglist.wg = req.params.wg;
    newShoppinglist.save(function(err, newShoppinglist){
        if (err) return next(err);
        req.wg.shoppinglists.push(newShoppinglist);
        req.wg.save(function(err, wg){
            if (err) return next(err);
            res.json(newShoppinglist);
        })
    });
});

router.delete('/:shoppinglist', function(req, res, next){
    Shoppinglist.remove({"_id": req.params.shoppinglist}, function(err){
        if (err) next(err);
        res.sendStatus(204);
    });
});

// Item Routes  ======================================================
var itemRoutes = require('./items');
router.use('/:shoppinglist/items', itemRoutes);

module.exports = router;