const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ItemSchema = new Schema({
    teaType:String,
    description:String,
    price:Number,
    image:String,
});

const model = mongoose.model('item',ItemSchema);
module.exports = model; 