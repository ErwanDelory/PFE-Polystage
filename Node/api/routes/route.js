const express = require('express');
const authentificationControllers = require('../controllers/authentificationController');
const registerController = require('../controllers/registerController');
const testControllers = require('../controllers/testController');

const router = express.Router();
router.get('/test', testControllers.testfunct);
router.post('/test1', testControllers.testPost);

router.post('/auth', authentificationControllers.auth);
router.post('/register', registerController.register);

module.exports = router;
