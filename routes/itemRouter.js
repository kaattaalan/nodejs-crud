// import required essentials
const express = require('express');
// create new router
const router = express.Router();
//import repository class
const itemRepo = require('../repo/itemRepo');
//bodyParser fixes for express
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//get all / search method
router.get('/:id?', function(req, res) {
    if(Object.keys(req.query).length < 1){
        if(req.params['id']){
            itemRepo.findOne(req.params, doc => res.status(200).json(doc))
        }else{
            itemRepo.findAllItems((docs) => res.status(200).json(docs))
        }
    }else {
        //query params exists. Convert to nedb query
        for (const [key, value] of Object.entries(req.query)) {
            var regexp = new RegExp(value);
            queryObj = { [key] : { $regex : regexp} };
        }
        itemRepo.searchByQuery(queryObj, doc => res.status(200).json(doc))
    }
});

//Insert
router.post('/', function(req, res) {
    itemRepo.addItem(req.body, (err, newDoc) => {
        if (err) {
            console.log(err.errorType)
            res.status(500).send(err)
        } else {
            res.status(201).json(newDoc)
        }
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

module.exports = router;