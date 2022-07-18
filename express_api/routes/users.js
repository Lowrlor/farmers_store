var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user_controller.js')

router.post('/register', user_controller.register)
router.post('/login', user_controller.login)

module.exports = router;
