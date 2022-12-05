var express = require('express')
const multer  = require('multer')
var jwt = require('jsonwebtoken')

var router = express.Router()

var main_controller = require('../controllers/main_controller.js')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './tmp/')
  },
  filename: function (req, file, cb) {
    var filename = file.fieldname + '-' + Date.now() + '.jpeg'
    cb(null, filename)
    req.body.filename = filename
  }
})

const upload = multer({ storage: storage })

router.post('/addNewProduct', upload.single('img'), main_controller.addNewProduct)
router.get('/getList', main_controller.getList)
router.post('/removeOne/:_id', main_controller.removeOne)
router.post('/updateOne', upload.single('img'), main_controller.updateOne)

module.exports = router;
