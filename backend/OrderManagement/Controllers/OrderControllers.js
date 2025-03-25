const Order = require("../Model/OrderModel");


const getAllOrders = async (req, res, next) => {


  try{

    const orders = await Order.find();
    if (!orders) {
        return res.status(404).json({message:"Order not found"});
    }

    res.status(200).json({orders});
   
    }catch (err) {
        console.log (err);
    }  

};


const addOrders = async (req, res, next) =>{

    const {Full_Name,Delivery_Address,Contact_Number, Email_Address,Select_Tea_Type,Quantity,Price} = req.body;
    

    let orders;

    try {
        orders = new Order ({Full_Name,Delivery_Address,Contact_Number, Email_Address,Select_Tea_Type,Quantity,Price});
        await orders.save();

    }catch (err) {
        console.log(err);

    }

    if (!orders) {
        return res.status(404).json({message:"unable to add orders"});
    }

    return res.status(200).json({ orders });


};

const getById = async (req, res, next) => {

    const id = req.params.id;

    let order;

    try{
        order = await Order.findById(id);
    }catch (err) {
        console.log(err);
    }

    if (!order) {
        return res.status(404).json({message:"Order Not found"});
    }

    return res.status(200).json({ order });

}

const updateOrder = async (req, res, next) => {
    const id = req.params.id;
    const { Full_Name, Delivery_Address, Contact_Number, Email_Address, Select_Tea_Type, Quantity, Price } = req.body;

    let orders;

    try {
        // Use findByIdAndUpdate instead of findByIdAndDelete
        orders = await Order.findByIdAndUpdate(
            id,
            { Full_Name, Delivery_Address, Contact_Number, Email_Address, Select_Tea_Type, Quantity, Price },
            { new: true } // This ensures the updated document is returned
        );

    } catch (err) {
        console.log(err);
    }

    if (!orders) {
        return res.status(404).json({ message: "Unable to update order details" });
    }

    return res.status(200).json({ orders });
};

const deleteOrder = async (req, res, next) => {
    const id = req.params.id;  // ✅ Corrected "parms" to "params"

    let order;

    try {
        order = await Order.findByIdAndDelete(id);  // ✅ Corrected "findByIdAndD" to "findByIdAndDelete"
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error occurred" });  // ✅ Better error handling
    }

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order deleted successfully", order });
};




exports.getAllOrders = getAllOrders;
exports.addOrders = addOrders;
exports.getById = getById;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;