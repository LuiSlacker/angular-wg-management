// modules  ========================================================
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mongoose = require('mongoose');

// MongoDB models  =================================================
var WG = mongoose.model('WG');
var Shoppinglist = mongoose.model('Shoppinglist');

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


// Shoppinglist Routing Parameter  ===================================
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
router.get('/:wg/shoppinglists', function(req, res){
    req.wg.populate('shoppinglists', function(err, wg){
        res.json(wg.shoppinglists);
    });
});

router.get('/:wg/shoppinglists/:shoppinglist', function(req, res, next){
   res.json(req.shoppinglist);
});

router.post('/:wg/shoppinglists', jsonParser, function(req, res, next){
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

router.delete('/:wg/shoppinglists/:shoppinglist', function(req, res, next){
    Shoppinglist.remove({"_id": req.params.shoppinglist}, function(err){
        if (err) next(err);
        res.sendStatus(204);
    });
});

module.exports = router;