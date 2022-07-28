const mongoose = require('mongoose')
const BasketSchema = require('../models/basket.models.js')

exports.create = function (req, res) {
  if (!req.params.userId) res.sendStatus(500)
  const doc = new BasketSchema({
    userId: req.params.userId,
    list: [],
    total: 0
  })
  doc.save((err) => {
    if (err) return res.sendStatus(400)
    else res.json({list: doc, secuses: true, user: req.body})
  })
}

exports.get = function (req, res) {
  BasketSchema.findOne({ userId : req.params.userId })
    .then((item) => {
      res.send(item)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(404)
    })
}
exports.removeOne = function (req, res) {
  BasketSchema.findOne({ userId : req.params.userId })
    .then((item) => {
      console.log(req.params)
      item.list.splice(req.params.index, 1)
      item.total -= req.params.productcost
      BasketSchema.findOneAndUpdate({userId: req.params.userId}, {$set:item}, {new: true}, function (err, product) {
        if (err) return res.send(err).status(400)
        res.send(product).status(200)
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(404)
    })
}
exports.removeAll = function (req, res) {
  BasketSchema.findOne({ userId : req.params.userId })
    .then((item) => {
      item.list = []
      item.total = 0
      BasketSchema.findOneAndUpdate({userId: req.params.userId}, {$set:item}, {new: true}, function (err, product) {
        if (err) return res.send(err).status(400)
        res.send(product).status(200)
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(404)
    })
}
exports.addProduct = function (req, res) {
  BasketSchema.findOne({ userId: req.params.userId })
    .then((basket) => {
      let alreadyexist = false
      let basketList = basket.list
      let product = req.body.product
      basketList.forEach((item, i) => {
        if (product.name === item.name) {
          basketList[i].cost += product.cost
          basketList[i].weight += product.weight
          alreadyexist = true
        }
      })
      if (!alreadyexist) {
        basketList.push(product)
      }
      basket.total += product.cost
      let update = {
        list: basketList,
        total: basket.total
      }
      BasketSchema.findOneAndUpdate({userId: req.params.userId}, {$set:update}, {new: true}, function (err, product) {
        if (err) return res.send(err).status(400)
        res.send(product).status(200)
      })
    })
    .catch(err => {
      console.log(err)
    })
}
