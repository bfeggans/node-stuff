const express = require('express');
const router = express.Router();
const beers = require('../models/beers');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.render('pages/beertracker');
});

router.post('/api/addBeer', (req, res) => {
    const newBeer = req.body;
    beers.add(newBeer);

    res.writeHead(200);
    res.end(JSON.stringify(newBeer));
});

router.get('/api/getBeers', (req, res) => {
    const beerList = beers.getAll((data) => {
        res.json(data);
    });

    return beerList;
});

router.delete('/api/deleteBeer/:id', (req, res) => {
    const objectId = req.params.id;

    const returnValue = beers.delete(objectId, () => {
        res.json(true);
    });
});

router.put('/api/updateBeer/:id', (req, res) => {
  const updatedBeer = req.body;
  const objectId = req.params.id;

  beers.update(objectId, updatedBeer);

  res.writeHead(200);
  res.end(JSON.stringify(updatedBeer));
});

module.exports = router;
