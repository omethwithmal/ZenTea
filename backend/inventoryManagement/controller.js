const {response}=require("./app");
const Inventory = require("./model");

const getInventory=(req,res,next)=>{
    Inventory.find()
        .then(response=>{
            res.json({response})
        })
        .catch(error=>{
            res.json({error})
        })
};

//////////////////////////////////////////////////
const addInventory=(req,res,next)=>{
    const inventory=new Inventory({
        
        teaType:req.body.teaType,
        quantity:req.body.quantity,
        supplier:req.body.supplier,
        recordLevel:req.body.recordLevel,
        date:req.body.date,
        status:req.body.status,
       
    });

    inventory.save()

    .then(response=>{
        res.json({response})
    })

    .catch(error=>{
        res.json({error})
    })
}

////////////////////////////////////////////////////

const updateInventory=(req,res,next)=>{
    const { id } = req.params;
    const{teaType,quantity,supplier,recordLevel,date,status}=req.body;
    const ObjectId = require('mongodb').ObjectId;

    Inventory.updateOne({_id:new ObjectId(id)}, { $set: { teaType, quantity, supplier, recordLevel,date,status}})
    
    .then(response =>{
        res.json({ message: "Expense updated successfully" });
    })
    .catch(error =>{
        res.json({ error: "Error updating Expense" })
    })
}

//////////////////////////////////////////////////////
const deleteInventory = (req, res) => {
    const { id } = req.params; // Get user ID from URL parameters
    const ObjectId = require('mongodb').ObjectId;

    Inventory.deleteOne({ _id: new ObjectId(id) })
        .then(response => {
            if (response.deletedCount > 0) {
                res.json({ message: "Inventory deleted successfully" });
            } else {
                res.status(404).json({ error: "Inventory not found" });
            }
        })
        .catch(error => {
            res.status(500).json({ error: "Error deleting Inventory", details: error.message });
        });
};

exports.getInventory=getInventory;
exports.addInventory=addInventory;
exports.updateInventory=updateInventory;
exports.deleteInventory=deleteInventory;
