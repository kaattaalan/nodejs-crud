// import required essentials
const express = require('express');
// create new router
const router = express.Router();
//import repository class
const itemRepo = require('../repo/itemRepo');
//bodyParser fixes for express
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//get all
router.get('/', function(req, res) {
    res.status(200).json(itemRepo.findAllItems());
});

//find by ID
router.get('/:id', function(req, res) {

    let found = itemRepo.findItemById(req.params.id)

    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

//Insert
router.post('/', function(req, res) {
    var newItem = itemRepo.addItem(req.body.title);
    res.status(201).json(newItem);
});

//update
router.put('/', function(req, res) {
    if (itemRepo.checkIfIdExists(req.body.id)) {
        itemRepo.updateItem(req.body);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

//delete
router.delete('/', function(req, res) {
    if (itemRepo.deleteItem(req.params.id)) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
})

module.exports = router;