const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
const UserSchema = require('../models/user.models.js')

exports.register = function (req, res) {
  console.log(req.body)
  if (!req.body.email || !req.body.password) res.sendStatus(500)
  console.log(req.body)
  var user = req.body
  const doc = new UserSchema({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password)
  })
  doc.save((err) => {
    if (err) return res.sendStatus(400)
    else res.json({secuses: true, user: req.body})
  })
}
exports.login = function (req, res) {
  const { email, password } = req.body;
  UserSchema.findOne({email})
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        console.log(user)
        res.status(200).json({
          user: {
            user_id: user._id,
            email: user.email,
            role: user.role,
            token: token
          }
        });
      } else {
        res.sendStatus(401)
      }
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(500)
    });
    function generateToken(user) {
      const payload = {
        userid: user._id,
        username: user.username,
      };
      const options = {
        expiresIn: "1h",
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, options);

      return token;
    }
}
