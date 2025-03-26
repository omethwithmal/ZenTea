const mongoose = require('mongoose'); 
//const Equipment = require('../Model/EquipmentModel');
const Schema = mongoose.Schema; 

const EquipmentSchema = new Schema({
    serial_number:{
        type:String,
        required:true,
    },
    eqm_name:{
        type:String,
        required:true,
    },   
    type:{
        type:String,
        required:true,
    },
    purchase_date:{
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
    warrenty_information:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
    
});



module.exports = mongoose.model('Equipment', EquipmentSchema); 