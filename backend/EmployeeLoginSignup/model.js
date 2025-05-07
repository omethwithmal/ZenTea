const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const RegisterSchema=new Schema({
    
    name:String,
    email:String,
    
    password:String,
    userType:String,
   
});

const model=mongoose.model('Employeeregister',RegisterSchema); //mathanata denna ona database eke row eke name eka
module.exports=model;