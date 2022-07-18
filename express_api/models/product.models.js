const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  name:  {
    type: String,
    required: [true, "Це поле є обов'язкове"],
    unique: true
  },
  cost: {
    type: Number,
    required: [true, "Це поле є обов'язкове"]
  },
  category: {
    type: String,
    required: [true, "Це поле є обов'язкове"]
  },
  img: {
    type: String,
    required: [true, "Це поле є обов'язкове"]
  },
  comments: String,
  weight: Number
});
productSchema.pre("save", function(next) {
    this.weight = 1000
    next()
});
productSchema.path('name').validate(function (value, respond) {
  return mongoose.model('Products').count({ name: value }).exec().then(function (count) {
      return !count;
    })
    .catch(function (err) {
      throw err;
    });
}, 'Name already exists.');
module.exports = mongoose.model("Products", productSchema)
