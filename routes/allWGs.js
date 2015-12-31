// modules  ========================================================
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mongoose = require('mongoose');

// MongoDB model  ==================================================
var WG = mongoose.model('WG');

router.get('/', function(req, res, next){
    WG.find(function(err, wgs){
        if (err) return next(err);

        res.json(wgs)
    });
});

router.post('/', jsonParser, function(req, res, next){
    var wg = new WG(req.body);
    wg.save(function(err, wg){
        if (err) return next(err);
        res.json(wg);
    })
});

router.delete('/:wg', function(req, res, next){
    console.log(req.params.wg);
    WG.remove({"_id": req.params.wg}, function(err){
        if (err) return next(err);
        res.sendStatus(204);
    });
});

module.exports = router;