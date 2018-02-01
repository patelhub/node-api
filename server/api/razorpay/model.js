var mongoose = require('mongoose');

var model = mongoose.model('Razorpay', {
  amount: {
    type: Number,
    required: true
  },
  razorpay_odrderId:{
    type: String
  }
});

module.exports = { model, Razorpay: model };
