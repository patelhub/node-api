var mongoose = require('mongoose');

var model = mongoose.model('Candidate', new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  uidai: {
    type: Number,
    // required: true,
    minlength: 12
  },
  birthdate: {
    type: Date,
    // required: true
  },
  gender: {},
  education: {},
  mobile: {},
  email: {},
  password: {}
}, { strict: false }));

module.exports = { model };
