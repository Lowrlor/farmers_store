const mongoose = require('mongoose')
const Bcrypt = require('bcryptjs')
const UserSchema = require('../models/user.models.js')

exports.register = function (req, res) {
  if (!req.body.email || !req.body.password) res.json({ secuses: false, error: 'Bad req'})
  console.log(req.body)
  var user = req.body
  const doc = new UserSchema({
    email: req.body.email,
    password: Bcrypt.hashSync(req.body.password)
  })
  doc.save((err) => {
    if (err) return res.json({secuses: false, err}).status(400)
    else res.json({secuses: true, user: req.body}).status(200)
  })
}
exports.login = function (req, res) {
  var user = req.body
  UserSchema.findOne({email: user.email}, function (err, doc) {
    console.log(doc)
    res.send(doc).status(200)
  })
}
