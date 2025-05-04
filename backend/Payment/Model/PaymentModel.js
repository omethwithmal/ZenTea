const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({

    Amount: {
        type:Number,
        required:true,
    },

    Card_number: {
        type:String,
        required:true,
    },

    Name_on_Card: {
        type:String,
        required:true,
    },

    CVV_CODE: {
        type:String,
        required:true,
    },

    Expiration_date: {
        type:String,
        required:true,
    },


});

module.exports = mongoose.model(
    "PaymentModel",
    paymentSchema

)

