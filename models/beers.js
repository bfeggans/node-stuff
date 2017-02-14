var mongojs = require('mongojs');
var constants = require('./constants');
var db = mongojs(constants.dbURI, ['mynewcollection']);

var getAllBeers = function(cb) {
    db.mynewcollection.find({}, function(err, result){
        if (err) {
            console.log(err); return;
        }
        cb(result);
    });
}

var addBeer = function(newBeer, cb) {
    console.log(newBeer);
    db.mynewcollection.insert(newBeer);
}

var deleteBeer = function(objectId, cb) {
    db.mynewcollection.remove({ '_id' : db.ObjectId(objectId) }, function(err, result) {
        if (err) {
            console.log(err); return;
        }
        cb(result);
    });
}

module.exports = {
    getAll: getAllBeers,
    add: addBeer,
    delete: deleteBeer
};
