const express = require('express');
const router = express.Router();
const beers = require('../models/beers');

router.use('/beerTracker', require('./beerController'));
router.use('/graphql', require('./graphql'));
router.get('/', (req, res) => res.render('pages/home.ejs'))

module.exports = router;
