const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const MaintenanceSchema = new Schema({
    serial_number:{
        type:String,
        required:true,
    },
    eqm_name:{
        type:String,
        required:true,
    },   
    description:{
        type:String,
        required:true,
    },    
    last_maintenance_date:{
        type:String,
        required:true,
    },
    next_maintenance_date:{
        type:String,
        required:true,
    },
    technician:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
    }
    
});


module.exports = mongoose.model('Maintenance', MaintenanceSchema); 