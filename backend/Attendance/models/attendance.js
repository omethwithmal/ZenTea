const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const attendanceSchema = new Schema({

    fullName: {
        type: String,
        required: true,
        trim: true 
    },

    employeeID: {
        type: String,
        required: true,
        unique: true, 
        trim: true
    },

    date: {
        type: Date,
        required: true,
        default: Date.now 
    },

    inTime: {
        type: String, 
        required: true
    },

    outTime: {
        type: String, 
        required: true
    },

    department: {
        type: String,
        required: true,
        enum: [
            'Human Resources (HR)',
            'Sales & Marketing',
            'Maintenance Department',
            'Quality Control Department',
            'Production Department'
        ], 
        trim: true
    }

}, { timestamps: true }); 


const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;