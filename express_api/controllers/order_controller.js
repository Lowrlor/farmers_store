const mongoose = require('mongoose')
const OrderSchema = require('../models/order.models.js')

exports.create = function (req, res) {
  const doc = new OrderSchema({
    productList: req.body.basketList,
    phoneNumber: req.body.phoneNumber,
    date: req.body.date,
    userid: req.body.userid,
    total: req.body.total,
    status: ''
  })
  doc.save((err) => {
    if (err) return res.send(err).status(400)
    else return res.send('doc').status(200)
  })
}
exports.get = function (req, res) {
  if (req.params.type === 'all') {
    OrderSchema.find({}, function (err, orders) {
      if (err) return handleError(err)
      res.send(orders).status(200)
    })
  }
  if (req.params.type === 'accepted') {
    OrderSchema.find({ status: 'accepted' }, function (err, orders) {
      if (err) return handleError(err)
      res.send(orders).status(200)
    })
  }
  if (req.params.type === 'processing') {
    OrderSchema.find({ status: 'processing' }, function (err, orders) {
      if (err) return handleError(err)
      res.send(orders).status(200)
    })
  }
  if (req.params.type === 'rejected') {
    OrderSchema.find({ status: "rejected" }, function (err, orders) {
      if (err) return handleError(err)
      res.send(orders).status(200)
    })
  }
}
exports.getbyid = function (req, res) {
  OrderSchema.find({ userid: req.params.userid }, function (err, orders) {
    if (err) return handleError(err)
    res.send(orders).status(200)
  });
}
exports.updateOne = function (req, res) {
  console.log(req.body)
  var update = req.body.data
  OrderSchema.findOneAndUpdate({ _id: req.params.orderid }, {$set:update}, {new: true}, function (err, product) {
    if (err) return res.send(err).status(400)
    res.send(product).status(200)
  })
}
exports.removeOne = function (req, res) {
  OrderSchema.deleteOne({ _id: req.params.orderid }, function (err, orders) {
    if (err) return res.send(err).status(400)
    res.sendStatus(200)
  });
}
