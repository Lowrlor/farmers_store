var express = require('express');
var router = express.Router();
var basket_controller = require('../controllers/basket_controller.js')

router.get('/create/:userId', basket_controller.create)
router.get('/get/:userId', basket_controller.get)
router.post('/addProduct/:userId', basket_controller.addProduct)
router.post('/removeone/:userId/:index/:productcost', basket_controller.removeOne)
router.post('/removeall/:userId/', basket_controller.removeAll)

module.exports = router;
