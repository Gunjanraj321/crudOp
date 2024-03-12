const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/auth');
const userController = require('../controller/user');

router.post('/', userController.getHomePage);

router.post('/:userId/:resource', userController.createUserData);

router.get('/Dashboard/:userId', userController.getFieldNames);

router.get('/:userId/:resource', userController.getAllData);

router.get('/:userId/:resource/:id', userController.getUserDataById);

router.delete('/:userId/:resource/:id', userController.deleteUserData);

router.put('/:userId/:resource/:id', userController.updateUserData);


module.exports = router;