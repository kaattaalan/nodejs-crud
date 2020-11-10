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
    db.insert(body, (err, newDoc) => callBack(newDoc))
}


var updateItem = (itemJson) => {
    let updated = {
        id: itemJson.id,
        title: itemJson.title,
        order: itemJson.order,
        completed: itemJson.completed,
        createdOn: itemJson.createdOn
    };
    let targetIndex = data.indexOf(itemJson.id);
    data.splice(targetIndex, 1, updated);
}

var deleteItem = (id) => {

    let found = data.find(function(item) {
        return item.id === parseInt(id);
    });
    if (found) {
        let targetIndex = data.indexOf(found);
        data.splice(targetIndex, 1);
    }
    return found;
}

module.exports = {
    findItemById,
    findAllItems,
    addItem,
    updateItem,
    deleteItem
}