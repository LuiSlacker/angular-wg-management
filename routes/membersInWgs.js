// modules  ========================================================
var express = require('express'),
    router = express.Router({mergeParams: true}),
    bodyParser = require('body-parser'),
    jsonParser = bodyParser.json(),
    mongoose = require('mongoose');

// MongoDB model  =================================================
require('../models/Users');
var usermodel = mongoose.model('Users');

// WG Routing Parameter ============================================
router.param('member', function(req, res, next, id){
    usermodel.findById(id, function(err, member){
        if (err){
            next(err)
        } else if (!member) {
            next(new Error('Failed to load User'));
        } else{
            req.member = member;
            next();
        }
    })
});

// Shoppinglist Routes  ==============================================
router.get('/', function(req, res){
    req.wg.populate('members', function(err, wg){
        res.json(wg.members);
    });
});

router.delete('/:member', function(req, res, next){
    req.member.wg = undefined;
    req.member.save(function(err, member){
        if(err) next(err);
        req.wg.members.pull(req.member._id);
        req.wg.save(function(err, wg){
            if (err) next(err);
            res.json(member);
        });
    })
});

router.put('/:member', function(req, res, next){
    req.member.wg = req.wg._id;
    req.member.save(function(err, member){
        if (err) return next(err);
        req.wg.members.push(req.member._id);
        req.wg.save(function(err){
            if (err) next(err);
            res.json(member)
        });
    });
});

module.exports = router;