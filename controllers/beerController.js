var express = require('express');
var router = express.Router();
var beers = require('../models/beers');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', function(req, res) {
    res.render('pages/beertracker');
});

router.post('/api/addBeer', function(req, res) {
    var newBeer = req.body;
    beers.add(newBeer);

    res.writeHead(200);
    res.end(JSON.stringify(newBeer));
});

router.get('/api/getBeers', function(req, res) {
    var beerList = beers.getAll(function(data) {
        res.json(data);
    });

    return beerList;
});

router.delete('/api/deleteBeer/:id', function(req, res) {
    var objectId = req.params.id;

    var returnValue = beers.delete(objectId, function() {
        res.json(true);
    });
});

router.put('/api/updateBeer/:id', function(req, res) {
  var updatedBeer = req.body;
  var objectId = req.params.id;

  beers.update(objectId, updatedBeer);

  res.writeHead(200);
  res.end(JSON.stringify(updatedBeer));
});

module.exports = router;
