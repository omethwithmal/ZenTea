const express = require("express");
const router = express.Router();
//insert model
const Equipment = require('../Model/EquipmentModel');
//insert equipment controller

const EquipmentController = require('../Controller/EquipmentController'); 




router.get("/",EquipmentController.getAllEquipments);
router.post("/addEquipment",EquipmentController.addEquipments);
router.get("/:id",EquipmentController.getById);
router.put("/updateEquipment/:id",EquipmentController.updateEquipment);
router.delete("/deleteEquipment/:id",EquipmentController.deleteEquipment);

//export
module.exports=router;