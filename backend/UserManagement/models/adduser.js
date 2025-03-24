const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adduser = new Schema({
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
    employeeId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    birthDate: {
        type: Date,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
        trim: true,
        match: [/^\d{10}$/, 'Invalid phone number format'], // 10 digit phone number validation
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email format'], // Email validation
    },
    homeAddress: {
        type: String,
        required: true,
        trim: true,
    },
    nationalId: {
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
        enum: [
            'Plantation Department',
            'Production & Processing Department',
            'Quality Control Department',
            'Finance Department',
            'Development Department'
        ],
    },
});

module.exports = mongoose.model('User', adduser);
