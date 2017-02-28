const express = require('express');
const router = express.Router();
const graphqlHTTP = require('express-graphql');
const { beerSchema, beerQueryType } = require('../models/graphql');

router.use('/beers', graphqlHTTP({
  schema: beerSchema,
  rootValue: beerQueryType,
  graphiql: true
}));

module.exports = router;
