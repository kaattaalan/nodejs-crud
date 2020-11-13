var Datastore = require('nedb'),
    db = new Datastore({ filename: './repo/itemdatafile', autoload: true });

//enable unique key constraints
db.ensureIndex({ fieldName: 'id', unique: true })

var findItemById = function(val, callBack) {
    db.find({ id: val }, (err, docs) => callBack(docs))
}

var findAllItems = function(callBack) {
    db.find({}, (err, docs) => callBack(docs))
}

var addItem = function(body, callBack) {
    db.insert(body, (err, newDoc) => callBack(err, newDoc))
}

var updateItem = (item, callBack) => {
    db.update({ id: item.id }, item, { upsert: true }, (err, numReplaced, upsert) => callBack(err, numReplaced))
}

var deleteItem = (idVal, callBack) => {
    db.remove({ id: idVal }, {}, (err, numRemoved) => callBack(err, numRemoved))
}

module.exports = {
    findItemById,
    findAllItems,
    addItem,
    updateItem,
    deleteItem
}