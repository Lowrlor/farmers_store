const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
  productList:  {
    type: Object,
    required: [true, "Це поле є обов'язкове"]
  },
  phoneNumber: {
    type: String,
    required: [true, "Це поле є обов'язкове"]
  },
  date: {
    type: String,
    required: [true, "Це поле є обов'язкове"]
  },
  userid: {
    type: String,
    required: [true, "Це поле є обов'язкове"]
  },
  total: {
    type: String,
    required: [true, "Це поле є обов'язкове"]
  },
  status: {
    type: String,
    required: [true, "Це поле є обов'язкове"]
  }
});
orderSchema.pre("save", function(next) {
    this.status = 'processing'
    console.log('asd')
    next()
});
module.exports = mongoose.model("Orders", orderSchema)
