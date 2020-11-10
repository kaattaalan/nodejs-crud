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
    itemRepo.findAllItems((docs) => res.status(200).json(docs))
});

//find by ID
router.get('/:id', function(req, res) {
    itemRepo.findItemById(req.params.id, (docs) => res.status(200).json(docs))
});

//Insert
router.post('/', function(req, res) {
    itemRepo.addItem(req.body, (newDoc) => res.status(201).json(newDoc))
});

//update
router.put('/', function(req, res) {
    itemRepo.updateItem(req.body);
    res.sendStatus(204);
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