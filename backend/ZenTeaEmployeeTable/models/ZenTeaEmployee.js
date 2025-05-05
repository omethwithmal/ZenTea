const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: { // ✅ Fixed key name
        type: String,
        required: true,
        trim: true,
    },
    employeeID: {
        type: String,
        required: true,
        unique: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
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
    },
});

module.exports = mongoose.model("Employee", empSchema); // ✅ Use correct model name
