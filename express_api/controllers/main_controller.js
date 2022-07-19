require('dotenv').config()
const mongoose = require('mongoose')
const fs = require('fs')
const ProductSchema = require('../models/product.models.js')
const stripe = require('stripe')(process.env.API_STRIPE_TOKEN)
exports.addNewProduct = function (req, res) {
  console.log(req.body);
  if (req.body.name == '' || req.body.cost == '') {
    console.log('here');
    return res.sendStatus(400)
  }
  const doc = new ProductSchema({
    name: req.body.name,
    cost: req.body.cost,
    img: req.body.name + '.jpeg',
    category: req.body.category
  })

  doc.save((err) => {
    if (err) return res.send(err).status(400)
    fs.copyFile('./tmp/' + req.body.filename, './img/' + req.body.name + '.jpeg', (err) => {
      if (err) throw err
      console.log('File was copied to destination')
      fs.readdir('./tmp', function(err, items) {
        items.forEach(function(file) {
          fs.unlink('./tmp/' + file, function (err) {
            if (err) throw err;
            console.log('Deleted ' + file)
          })
        })
      })
    })
    return res.send(doc).status(200)
  })
}
exports.getList = function (req, res) {
  ProductSchema.find({}, function (err, products) {
    if (err) return handleError(err)
    res.send(products).status(200)
  });
}
exports.updateOne = function (req, res) {
  var update = req.body
  console.log(req.body.filename)
  if (req.body.filename) {
    fs.unlink('./img/' + req.body.name + '.jpeg', function (err) {
      if (err) throw err
    })
    ProductSchema.findOne({_id: req.body._id}, function (err, product) {
      fs.copyFile('./tmp/' + req.body.filename, './img/' + product.name + '.jpeg', (err) => {
        if (err) throw err
        console.log('File was copied to destination')
        fs.readdir('./tmp', function (err, items) {
          items.forEach(function (file) {
            fs.unlink('./tmp/' + file, function (err) {
              if (err) throw err;
              console.log('Deleted ' + file)
            })
          })
        })
      })
    })
  }
  ProductSchema.findOne({_id: req.body._id}, function (err, oldValue) {
    console.log(req.body)
    if (req.body.name) {
      fs.rename('./img/' + oldValue.name + '.jpeg', './img/' + req.body.name + '.jpeg', function (err) {
        if ( err ) console.log('ERROR: ' + err)
        console.log(update)
      })
        update.img = req.body.name + '.jpeg'
    }
    ProductSchema.findOneAndUpdate({_id: req.body._id}, {$set:update}, {new: true}, function (err, product) {
      if (err) return res.send(err).status(400)
      res.send(product).status(200)
    })
  })


}
exports.removeOne = function (req, res) {
  ProductSchema.findOneAndRemove({_id: req.params._id}, function (err, product) {
    if (err) return handleError(err)
    fs.unlink('./img/' + product.img, function () {
      return res.send(product).status(200)
    })
  })
}
exports.stripePayment = function (req, res) {
  var productsPrice = 0
  var description = ''
  req.body.basketList.forEach((item, i) => {
    productsPrice += item.cost
    description += item.name + ': ' + item.cost + ' UAH' + '\n'
  })
  const product = stripe.products.create({name: '#' + Math.floor(Math.random() * 10**10), description: description}, function (err, product) {
    const price = stripe.prices.create({
      unit_amount: productsPrice * 100,
      currency: 'UAH',
      product: product.id
    },
    function (err, prise) {
      const session = stripe.checkout.sessions.create({
        success_url: 'http://localhost:8080/',
        cancel_url: 'http://localhost:8080/',
        line_items: [
          {
            price: prise.id,
            quantity: 1
          },
        ],
        mode: 'payment'
      },
      function (err, session) {
        res.send(session).status(200)
      })
    });
  })
}
exports.getOne = function (req, res) {
  console.log(req.params._id)
  ProductSchema.findOne({_id: req.params._id}, function (err, product) {
    if (err) return handleError(err)
    console.log(req.params.cost)
    product.weight = req.params.weight
    product.cost = req.params.cost
    res.send(product).status(200)
  })
}
