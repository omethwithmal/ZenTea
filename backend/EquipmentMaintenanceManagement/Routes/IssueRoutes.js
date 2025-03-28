const express = require("express");
const router2 = express.Router();
//insert model
const Issue = require('../Model/IssueModel');
//insert issue controller
const IssueController = require('../Controller/IssueController'); 


router2.get("/",IssueController.getAllIssues);
router2.post("/addIssue",IssueController.addIssues);
router2.get("/:id",IssueController.getById);
router2.put("/updateIssue/:id",IssueController.updateIssue);
router2.delete("/deleteIssue/:id",IssueController.deleteIssue);

//export
module.exports=router2;