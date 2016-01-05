// modules  ========================================================
var express = require('express'),
    router = express.Router({mergeParams: true}),
    bodyParser = require('body-parser'),
    jsonParser = bodyParser.json(),
    mongoose = require('mongoose');

// MongoDB model  =================================================
require('../models/Items');
var Item = mongoose.model('Item');

// Item Routing Parameter  ========================================
router.param('item', function(req, res, next, id){
    Item.findById(id, function(err, item){
        if (err) {
            next(err);
        } else if (!item){
            next(new Error('Failed to load Item'));
        } else {
            req.item = item;
            next();
        }
    });
});

router.post('/', jsonParser, function(req, res, next){
    var item = new Item(req.body);
    item.shoppinglist = req.params.shoppinglist;
    item.save(function(err, item){
        if (err) return next(err);
        req.shoppinglist.items.push(item);
        req.shoppinglist.save(function(err, shoppinglist){
            if (err) return next(err);
            res.json(item)
        });
    });
});

router.get('/', function(req, res){
    req.shoppinglist.populate('items', function(err, shoppinglist){
        if (err) return next(err);
        res.json(shoppinglist.items);
    });
});

router.put('/:item', jsonParser, function(req, res, next){
    console.log(req.item);
    req.item.name = req.body.name || req.item.name;
    req.item.purchased = req.body.purchased || req.item.purchased;
    req.item.save(function(err, item){
        if (err) return next(err);
        res.json(item);
    });

});

router.delete('/:itemID', function(req, res, next){
    Item.remove({"_id":req.params.itemID}, function(err){
        if (err) return next(err);
        res.sendStatus(204);
    })
});

module.exports = router;