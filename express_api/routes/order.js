var express = require('express');
var router = express.Router();
var order_controller = require('../controllers/order_controller.js')

router.post('/create', order_controller.create)
router.get('/get/:type', order_controller.get)
router.get('/getbyid/:userid', order_controller.getbyid)
router.post('/updateOne/:orderid', order_controller.updateOne)
router.get('/removeOne/:orderid', order_controller.removeOne)

module.exports = router;
