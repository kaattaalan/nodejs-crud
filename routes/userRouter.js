const express = require('express'),
    router = express.Router(),
    userController = require('../controllers/user.controller');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);

module.exports = router;