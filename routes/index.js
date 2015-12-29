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

module.exports = router;