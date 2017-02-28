const express = require('express');
const router = express.Router();
const { getAll } = require('./beers');
const graphql = require('graphql');

const beerType = new graphql.GraphQLObjectType({
  name: 'Beer',
  fields: {
    _id: {
      type: graphql.GraphQLID
    },
    name: {
      type: graphql.GraphQLString
    },
    rating: {
      type: graphql.GraphQLInt
    }
  }
});

var beerQueryType = new graphql.GraphQLObjectType({
  name: 'BeerQueryType',
  fields: () => {
    return {
      beers: {
        type: new graphql.GraphQLList(beerType),
        resolve: () => {
          return new Promise((resolve, reject) => {
            getAll((result) => {
              resolve(result);
            })
          })
        }
      }
    }
  }
})

//TODO: double check on the "RootQueryType" - think it is used exclusively
//by the GraphiQL UI.
const beerSchema = new graphql.GraphQLSchema({ query: beerQueryType });

module.exports = {
  beerSchema,
  beerQueryType
};
