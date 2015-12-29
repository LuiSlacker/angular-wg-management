var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var WG = mongoose.model('WG');

router.get('/wgs', function(req, res, next){
    WG.find(function(err, wgs){
        if (err) return next(err);

        res.json(wgs)
    });
});

router.post('/wgs', function(req, res, next){
    var wg = new WG(req.body);
    wg.save(function(err, wg){
        if (err) return next(err);
        res.json(wg);
    })
});

module.exports = router;