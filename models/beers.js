const mongojs = require('mongojs');
const constants = require('./constants');
const db = mongojs(constants.dbURI, ['mynewcollection']);

const getAllBeers = (cb) => {
    db.mynewcollection.find({}, (err, result) => {
        if (err) {
            console.log(err); return;
        }
        cb(result);
    });
}

const addBeer = (newBeer, cb) => {
    console.log(newBeer);
    db.mynewcollection.insert(newBeer);
}

const deleteBeer = (objectId, cb) => {
    db.mynewcollection.remove({ '_id' : db.ObjectId(objectId) }, (err, result) => {
        if (err) {
            console.log(err); return;
        }
        cb(result);
    });
}

const updateBeer = (objectId, updateObj) => {
    db.mynewcollection.update({ '_id': db.ObjectId(objectId) }, {$set: updateObj}, (err, result) => {
        if (err) {
            console.log(err); return;
        }
    });
}

module.exports = {
    getAll: getAllBeers,
    add: addBeer,
    delete: deleteBeer,
    update: updateBeer
};
