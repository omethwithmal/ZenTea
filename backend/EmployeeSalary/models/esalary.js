const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const employeeSalarySchema = new Schema(
  {
    employeename: {
      type: String,
      required: true,
      trim: true,
    },
    employeeID: {
      type: String,
      required: true,
      trim: true,
      unique: true, 
    },
    accountNumber: {
      type: String,
      required: true,
      trim: true,
      
      },
    
    basicSalary: {
      type: Number,
      required: true,
      
    },
    otHours: {
      type: Number,
      
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, 
  }
);


const EmployeeSalary = mongoose.model('EmployeeSalary', employeeSalarySchema);


module.exports = EmployeeSalary;