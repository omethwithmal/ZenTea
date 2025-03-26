const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  employeeID: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10}$/, "Invalid phone number format"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Invalid email format"],
  },
  homeAddress: {
    type: String,
    required: true,
    trim: true,
  },
  nationalID: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    enum: ["HR", "IT", "Finance", "Marketing"],
  },
  basicSalary: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);