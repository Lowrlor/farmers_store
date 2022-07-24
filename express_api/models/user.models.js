const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email:  {
    type: String,
    required: [true, "Це поле є обов'язкове"]
  },
  password: {
    type: String,
    required: [true, "Це поле є обов'язкове"]
  },
  role: Number
});
userSchema.path('email').validate(function (value, respond) {
  return mongoose.model('User').count({ email: value }).exec().then(function (count) {
      return !count;
    })
    .catch(function (err) {
      throw err;
    });
}, 'Email already exists.');
userSchema.pre("save", function(next) {
    this.role = 1
    this.email = this.email.trim()
    next()
});
module.exports = mongoose.model("User", userSchema)
