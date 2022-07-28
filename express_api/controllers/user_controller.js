const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
const UserSchema = require('../models/user.models.js')

exports.register = function (req, res) {
  if (!req.body.email || !req.body.password) res.sendStatus(500)
  var user = req.body
  const doc = new UserSchema({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password)
  })
  doc.save((err) => {
    if (err) return res.sendStatus(400)
    else res.json({id: doc._id, secuses: true, user: req.body})
  })
}
exports.login = function (req, res) {
  const { email, password } = req.body;
  UserSchema.findOne({email})
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.send({
          user: {
            id: user._id,
            email: user.email,
            role: user.role,
            token: generateToken(user)
          }
        })
      } else {
        res.sendStatus(401)
      }
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(500)
    });
}
exports.loginbytoken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            UserSchema.findById(user.userid)
              .then((user) => {
                res.send({
                  user: {
                    id: user._id,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user)
                  }
                })
              })
        });
    } else {
        res.sendStatus(401);
    }
}
exports.adminverefi = (req, res, next) => {
  UserSchema.findById(req.body.userid)
    .then((user) => {
      console.log(user)
      if (user.role < 1) {
        console.log('here')
        res.send({ token: generateToken(user) })
      } else {
        res.sendStatus(403)
      }

    })
}
exports.logout = (req, res, next) => {
  const user = req.body
  console.log(user);
  generateToken(user)
  res.sendStatus(200)
}

function generateToken(user) {
  const payload = {
    userid: user._id,
    username: user.username,
  };
  const options = {
    expiresIn: 3600
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);

  return token;
}
