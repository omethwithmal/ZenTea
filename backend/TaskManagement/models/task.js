const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the Task Schema
const taskSchema = new Schema({
    taskID: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    employeeName: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        enum: ['Production', 'HR', 'Finance', 'Inventory', 'Maintenance']
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    timePeriodHours: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    }
}, { timestamps: true });

// Create the Task Model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;