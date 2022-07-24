var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/user_controller.js')
var middlewaareUser = require('./middleware/middleware.user.js')

router.post('/register', user_controller.register)
router.post('/login', user_controller.login)
router.post('/logout', user_controller.logout)
router.post('/loginbytoken', user_controller.loginbytoken)
router.post('/adminverefi', middlewaareUser.adminverefi, user_controller.adminverefi)

module.exports = router;
