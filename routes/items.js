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
            req.shoppinglist = item;
            next();
        }
    });
});

router.get('/', function(req, res){
   Item.find(function(err, items){
       if (err) next(err);
       res.json(items);
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

module.exports = router;