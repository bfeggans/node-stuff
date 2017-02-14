var express = require('express');
var router = express.Router();
var beers = require('../models/beers');

router.use('/beerTracker', require('./beerController'));
router.get('/', function(req, res) {
  res.render('pages/home.ejs');
})

module.exports = router;
