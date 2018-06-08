var express = require('express');
let mongoose = require('mongoose');
let Fruit = require('../models/fruits');
var router = express.Router();

router.get('/', function (req, res, next) {
    let query = Fruit.find({});
    query.exec((err, fruits) => {
        if (err) 
            res.send(err);
        
        res.json(fruits);
    });
});

router.post('/', function (req, res, next) {
    var newFruit = new Fruit(req.body);
    newFruit.save((err, fruits) => {
        if (err) {
            res.send(err);
        } else {
            res.json({message: "Fruit successfully added!", fruits});
        }
    });
});

module.exports = router;
