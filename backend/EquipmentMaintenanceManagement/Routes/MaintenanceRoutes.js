const express = require("express");
const router1 = express.Router();
//insert model
const Maintenance = require('../Model/MaintenanceModel');
//insert Maintenance controller
const MaintenanceController = require('../Controller/MaintenanceController'); 


router1.get("/",MaintenanceController.getAllMaintenance);
router1.post("/addMaintenance",MaintenanceController.addMaintenance);
router1.get("/:id",MaintenanceController.getById);
router1.put("/updateMaintenance/:id",MaintenanceController.updateMaintenance);
router1.delete("/deleteMaintenance/:id",MaintenanceController.deleteMaintenance);

//export
module.exports=router1;