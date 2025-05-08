const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const InventorySchema = new Schema({
    teaType:String,
    quantity:Number,
    supplier:String,
    recordLevel:Number,
    date:String,
    status:String
});

const model = mongoose.model('inventory',InventorySchema);
module.exports = model; 