const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.get('/users', userController.getUsers);
router.post('/user', userController.getUserByNumber);
router.post('/user/create', userController.createUser);

module.exports = router;