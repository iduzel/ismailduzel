const mongoose = require("mongoose");
const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: { type: String, required: true },
  role: {type: String,
  default: 'user'},
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: { type: String},
  address: { type: String },
  phone: { type: Number },
  department: { type: String},
  tags: [],
  date: {
    type: Date,
    default: new Date().toUTCString()
  }
  

});

module.exports = mongoose.model('Employee', EmployeeSchema);