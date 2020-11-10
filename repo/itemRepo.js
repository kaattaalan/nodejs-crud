const fs = require('fs');
let data;

function initModule() {
    //initialize db by reading file
    let items = fs.readFileSync('./repo/items.json');
    data = JSON.parse(items);
}

initModule();

var findItemById = function(id) {
    return data.find(function(item) {
        return item.id === parseInt(id);
    });
}

var findAllItems = function() {
    return data;
}

var checkIfIdExists = function(id) {
    return data.find(function(item) {
        return item.id === parseInt(id);
    });
}

var addItem = (title) => {
    let itemIds = data.map(item => item.id);
    // get orderNums from data array
    let orderNums = data.map(item => item.order);

    // create new id (basically +1 of last item object)
    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
    // create new order number (basically +1 of last item object)
    let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;

    // create an object of new Item
    let newItem = {
        id: newId, // generated in above step
        title: title, // value of `title` get from POST req
        order: newOrderNum, // generated in above step
        completed: false, // default value is set to false
        createdOn: new Date() // new date object
    };

    // push new item object to data array of items
    data.push(newItem);
    return newItem;
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
    checkIfIdExists,
    deleteItem
}