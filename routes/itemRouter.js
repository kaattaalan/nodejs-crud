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
    itemRepo.findItemById(req.params.id, (doc) => {
        res.status(200).json(doc)
    })
});

//Insert
router.post('/', function(req, res) {
    itemRepo.addItem(req.body, (err, newDoc) => {
        if (err) {
            res.status(500).send(err)
        }
        res.status(201).json(newDoc)
    })
});

//update
router.put('/', function(req, res) {
    itemRepo.updateItem(req.body, (err, doc) => {
        res.sendStatus(204)
    })
});

//delete
router.delete('/:id', function(req, res) {
    itemRepo.deleteItem(req.params.id, (err, numRemoved) => res.sendStatus(204))
})

//deleteAll
router.delete('/', function(req, res) {
    itemRepo.deleteAll((err, numRemoved) => res.sendStatus(204))
})

//findByTitle
router.get('/', (req, res) => {
    itemRepo.findByTitle(req.query.title, doc => res.status(200).json(doc))
})

module.exports = router;