const Datastore = require('nedb'),
    db = new Datastore({ filename: './repo/itemdatafile', autoload: true }),
    crypto = require('crypto');

db.ensureIndex({ fieldName: 'id', unique: true })

const findItemById = function(val, callBack) {
    db.findOne({ id: val }, (err, docs) => callBack(docs))
}

const findAllItems = function(callBack) {
    db.find({}, (err, docs) => callBack(docs))
}

const addItem = function(body, callBack) {
    body.id = crypto.randomBytes(16).toString("hex");
    db.insert(body, (err, newDoc) => callBack(err, newDoc))
}

const updateItem = (item, callBack) => {
    db.update({ id: item.id }, item, { upsert: true }, (err, numReplaced, upsert) => callBack(err, numReplaced))
}

const deleteItem = (idVal, callBack) => {
    db.remove({ id: idVal }, {}, (err, numRemoved) => callBack(err, numRemoved))
}

const deleteAll = (callBack) => {
    db.remove({}, { multi: true }, function(err, numRemoved) {
        callBack(err, numRemoved)
    })
}

const findByTitle = (titleVal, callBack) => {
    db.find({ title: titleVal }, (err, doc) => callBack(doc))
}

module.exports = {
    findItemById,
    findAllItems,
    addItem,
    updateItem,
    deleteItem,
    deleteAll,
    findByTitle
}