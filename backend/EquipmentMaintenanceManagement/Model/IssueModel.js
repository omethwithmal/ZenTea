const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const IssueSchema = new Schema({
    serial_number:{
        type:String,
        required:true,
    },
    issue_title:{
        type:String,
        required:true,
    },   
    description:{
        type:String,
        required:true,
    },
    priority_level:{
        type:String,
        required:true,
    },
    assign_technician:{
        type:String,
        default:null,
    },
    maintenance_cost:{
        type:Number,
        default:0,
    }
    
    
});

module.exports = mongoose.model('Issue', IssueSchema); 