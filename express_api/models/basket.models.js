const mongoose = require('mongoose');
const { Schema } = mongoose;

const basketSchema = new Schema({
  userId:  {
    type: String,
    required: [true, "Це поле є обов'язкове"]
  },
  list: {
    type: Array
  },
  total: {
    type: Number
  }
});

module.exports = mongoose.model("Basket", basketSchema)
