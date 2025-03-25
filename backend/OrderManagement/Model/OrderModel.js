const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const orderSchema = new Schema ({

      Full_Name :{
        type:String,
        required:false,
      },

      Delivery_Address :{
        type:String,
        required:false,
      },

        Contact_Number :{
        type:Number,
        required:false,
      },
       
        Email_Address :{
        type:String,
        required:false,
      },

      Select_Tea_Type:{
        type:String,
        required:false,
      },

      Quantity :{
        type:String,
        required:false,
      },

      Price :{
        type:String,
        required:false,
      },

});

module.exports = mongoose.model(
    "OrderModel",
    orderSchema
);
