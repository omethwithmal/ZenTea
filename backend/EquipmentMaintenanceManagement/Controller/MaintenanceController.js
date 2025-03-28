const Maintenance = require('../Model/MaintenanceModel');

const getAllMaintenance = async (req, res,next) => {
        
    let maintenance;
        //Get all Maintenance
        try {
            maintenance = await Maintenance.find();
        }catch(err){
            console.log(err);
        }
        //not found
        if (!maintenance) {
            return res.status(404).json({ message: "Maintenance not found" });
        }
        //display all maintenance
        return res.status(200).json({maintenance});   
    };
 

//data insert
const addMaintenance =async(req, res, next) =>{
    const {serial_number,eqm_name,description,last_maintenance_date,next_maintenance_date,technician,status} = req.body;

    let maintenance;

    try{
        maintenance = new Maintenance({serial_number,eqm_name,description,last_maintenance_date,next_maintenance_date,technician,status});
        await maintenance.save();
    }catch (err){
        console.log(err);
    }
    //not insert equipments
    if(!maintenance){
        return res.status(404).send({message:"Unable to add Maintenance"});
    }
    return res.status(200).json({maintenance});
}


//get by  id
const getById =  async(req, res, next) => {

    const id = req.params.id;

    let maintenance;
    try{
        maintenance = await Maintenance.findById(id);
        
    }catch(err){
        console.log(err);
    }
    //not available equipments
    if (!maintenance) {
        return res.status(404).json({ message: "Maintenance not found" });
    }
    return res.status(200).json({maintenance});
}

//Update Maintenance details
const updateMaintenance = async (req, res, next) => {
    const id = req.params.id;

    const { serial_number, eqm_name, description, last_maintenance_date, next_maintenance_date, technician, status } = req.body;

    let updatedMaintenance;

    try {
        updatedMaintenance = await Maintenance.findByIdAndUpdate(
            id,
            {
                serial_number,
                eqm_name,
                description,
                last_maintenance_date,
                next_maintenance_date,
                technician,
                status
            },
            { new: true } // Returns the updated document
        );

        if (!updatedMaintenance) {
            return res.status(404).json({ message: "Maintenance record not found" });
        }

        return res.status(200).json({ message: "Maintenance updated successfully", maintenance: updatedMaintenance });

    } catch (err) {
        console.error("Error updating maintenance:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


//delete equipment details
const deleteMaintenance =async(req, res, next) => {
    const id = req.params.id;

    let maintenance;

    try{
        maintenance = await Maintenance.findByIdAndDelete(id);
    }catch(err){
        console.log(err)
    }
    if (!maintenance) {
        return res.status(404).json({ message: "Unable to delete Maintenance details" });
    }
    return res.status(200).json({maintenance});
}





exports.getAllMaintenance = getAllMaintenance;
exports.addMaintenance = addMaintenance;
exports.getById = getById;
exports.updateMaintenance = updateMaintenance;
exports.deleteMaintenance = deleteMaintenance;