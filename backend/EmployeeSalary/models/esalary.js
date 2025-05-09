// models/EmployeeSalary.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSalarySchema = new Schema({
  employeename: {
    type: String,
    required: false,
    trim: true,
  },
  employeeID: {
    type: String,
    required: false,
    trim: true,
  },
  accountNumber: {
    type: String,
    required: false,
    trim: true,
  },
  basicSalary: {
    type: Number,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

const EmployeeSalary = mongoose.model('EmployeeSalary', employeeSalarySchema);
module.exports = EmployeeSalary;
