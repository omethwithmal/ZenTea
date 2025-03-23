const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
        required: true, // Fixed spelling mistake (require -> required)
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema); // Fixed: taskSchema instead of taskShema

module.exports = Task;
