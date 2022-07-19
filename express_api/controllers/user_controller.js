const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
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
  const { email, password } = req.body;
  UserSchema.findOne({email})
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          user_id: user._id,
          email: user.email,
          role: user.role,
          token: token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json(err)
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
