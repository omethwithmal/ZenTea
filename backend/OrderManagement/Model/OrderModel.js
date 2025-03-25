const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const orderSchema = new Schema ({

      Full_Name :{
        type:String,
        required:true,
      },

      Delivery_Address :{
        type:String,
        required:true,
      },

        Contact_Number :{
        type:Number,
        required:true,
      },
       
        Email_Address :{
        type:String,
        required:true,
      },

      Select_Tea_Type:{
        type:String,
        required:true,
      },

      Quantity :{
        type:String,
        required:true,
      },

      Price :{
        type:String,
        required:true,
      },

});

module.exports = mongoose.model(
    "OrderModel",
    orderSchema
);
