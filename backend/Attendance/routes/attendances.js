const express = require("express");
const router = express.Router();
const Task = require("../models/attendance");
const Attendance = require("../models/attendance");

//add attendance

router.post("/add" , async (req, res)=>{
    const {fullName,employeeID,date,inTime,outTime,department}=req.body;

    if(!fullName || !employeeID || !date || !inTime || !outTime || !department ) {
        return res.status(400).json({error : "All fields are required"});

    }

    try{
        const newAttendance = new Attendance({fullName,employeeID,date,inTime,outTime,department});
        await newAttendance.save();
        res.json({ message :"Attendance added successfully"});

    }catch (err){
        res.status(500).json({error : "Fai add attendance"});
    }
});


//View attendance

router.get("/display", async (req,res)=>{
    try{
        const attendance = await Attendance.find();
        res.json(attendance);
    }catch (err){
        res.status(500).json({ error: "Failed to fetch attendance" , details: err.message});

    }
});

//update attendance

router.put("/update/:attendanceid", async (req, res) => {
    
    const { fullName,employeeID,date,inTime,outTime,department } = req.body;

    try {
        const updatedAttendance = await Attendance.findByIdAndUpdate(req.params.attendanceid, { fullName,employeeID,date,inTime,outTime,department }, { new: true });
        if (!updatedAttendance) {
            return res.status(404).json({ error: "Attendance not found" });
        }
        res.json({ message: "Attendance updated successfully", attendance: updatedAttendance });
    } catch (err) {
        res.status(500).json({ error: "Failed to update attendance", details: err.message });
    }
});

// Delete attendance
router.delete("/delete/:attendanceid", async (req, res) => {
    try {
        const deletedAttendance = await Attendance.findByIdAndDelete(req.params.attendanceid);
        if (!deletedAttendance) {
            return res.status(404).json({ error: "Attendance not found" });
        }
        res.json({ message: "Attendance deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete attendance", details: err.message });
    }
});

module.exports = router;