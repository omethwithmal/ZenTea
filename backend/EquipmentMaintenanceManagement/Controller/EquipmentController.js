const Equipment = require('../Model/EquipmentModel');

const getAllEquipments = async (req, res,next) => {
        
    let equipments;
        //Get all equipments
        try {
            equipments = await Equipment.find();
        }catch(err){
            console.log(err);
        }
        //not found
        if (!equipments) {
            return res.status(404).json({ message: "Equipment not found" });
        }
        //display all equipments
        return res.status(200).json({equipments});   
    };
 

//data insert
const addEquipments =async(req, res, next) =>{
    const {serial_number,eqm_name,type,purchase_date,last_maintenance_date,next_maintenance_date,warrenty_information,description} = req.body;

    let equipments;

    try{
        equipments = new Equipment({serial_number,eqm_name,type,purchase_date,last_maintenance_date,next_maintenance_date,warrenty_information,description});
        await equipments.save();
    }catch (err){
        console.log(err);
    }
    //not insert equipments
    if(!equipments){
        return res.status(404).send({message:"Unable to add equipments"});
    }
    return res.status(200).json({equipments});
}


//get by  id
const getById =  async(req, res, next) => {

    const id = req.params.id;

    let eauipments;
    try{
        equipments = await Equipment.findById(id);
        
    }catch(err){
        console.log(err);
    }
    //not available equipments
    if (!equipments) {
        return res.status(404).json({ message: "Equipment not found" });
    }
    return res.status(200).json({equipments});
}

//Update equipment details
const updateEquipment = async (req, res, next) => {
    const id = req.params.id;

    const { serial_number, eqm_name, type, purchase_date, last_maintenance_date, next_maintenance_date, warrenty_information, description } = req.body;

    let updatedEquipment;

    try {
        updatedEquipment = await Equipment.findByIdAndUpdate(
            id,
            {
                serial_number,
                eqm_name,
                type,
                purchase_date,
                last_maintenance_date,
                next_maintenance_date,
                warrenty_information,
                description
            },
            { new: true } // Return the updated document
        );

        if (!updatedEquipment) {
            return res.status(404).json({ message: "Equipment not found" });
        }

        return res.status(200).json({ message: "Equipment updated successfully", equipment: updatedEquipment });

    } catch (err) {
        console.error("Error updating equipment:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


//delete equipment details
const deleteEquipment =async(req, res, next) => {
    const id = req.params.id;

    let equipments;

    try{
        equipments = await Equipment.findByIdAndDelete(id);
    }catch(err){
        console.log(err)
    }
    if (!equipments) {
        return res.status(404).json({ message: "Unable to delete Equipment details" });
    }
    return res.status(200).json({equipments});
}


//module.exports = { getAllEquipments };
exports.getAllEquipments = getAllEquipments;
exports.addEquipments = addEquipments;
exports.getById = getById;
exports.updateEquipment = updateEquipment;
exports.deleteEquipment = deleteEquipment;
