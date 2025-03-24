const express = require("express");
const router = express.Router();
const User = require("../models/adduser"); // import task model

// add user
router.post("/add",async(req,res)=>{
    const{ firstName, lastName, employeeId, birthDate, contactNumber, email, homeAddress, nationalId, startDate, jobTitle, department } = req.body;

    if(!firstName || !lastName || !employeeId || !birthDate || !contactNumber || !email || !homeAddress || !nationalId  || !startDate || !jobTitle || !department){
        return res.status(400).json({ error:"required"});
    }

    try{
        const newUser = new User({firstName,lastName,employeeId,birthDate,contactNumber,email,homeAddress,nationalId,startDate,jobTitle,department});
        await newUser.save();
        res.json({ message : "Employee added Successfully"});
    } catch (err){
        res.status(500).json({ error:"Failed to add Employee", details: err.message});
    } 
});


//view employee

router.get("/display",async(req,res)=>{

    try{
        const users = await User.find();
        res.json(users);
    } catch (err){
        res.status(500).json({ error: "Employee failed to  view", details: err.message});
    }

});

// update employee

router.put("/update/:employeeId",async(req,res)=>{
    const{ firstName, lastName, employeeId, birthDate, contactNumber, email, homeAddress, nationalId, startDate, jobTitle, department} = req.body;

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.employeeId, {firstName, lastName, employeeId, birthDate, contactNumber, email, homeAddress, nationalId, startDate, jobTitle, department}, {new: true});
        if(!updateUser){
            return res.status(404).json({ error:"Employee not found"});
        }

        res.json({ message: "Employee Update successfully",User: updateUser});
    } catch (err){
        res.status(500).json({ error:"Fail Employee Update",details: err.message});
    }
});

//delete employee

router.delete("/delete/:employeeId", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.employeeId);
        if (!deletedUser) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.json({ message: "Employee deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete detet", details: err.message });
    }
});



module.exports = router; 