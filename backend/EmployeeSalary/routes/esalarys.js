const express = require("express");
const router = express.Router();

const EmployeeSalary = require("../models/esalary");

//add salary

router.post("/add" ,async(req, res)=>{
    const {employeename,employeeID,accountNumber,basicSalary,otHours,date} = req.body;

    if(!employeename || !employeeID || !accountNumber || !basicSalary  || !date){
        return res.status(400).json({error : "All fields are required"});
    }

    try{
        newEmployeeSalary = new EmployeeSalary ({employeename,employeeID,accountNumber,basicSalary,date});
        await newEmployeeSalary.save();
        res.json({ message : "salary added successfully "});

    }catch (err){
        res.status(500).json({error : "Fai add salary"});
    }
});

//view salary

router.get("/displaySalary", async (req,res)=>{
    try{
        const employeeSalary  = await EmployeeSalary.find();
        res.json(employeeSalary);
    }catch (err){
        res.status(500).json({error: "Failed to fetch salary" ,details: err.message});

    }
});

//update salary

router.put("/update/:employeeSalaryid", async (req, res) => {
    
    const { employeename, employeeID, accountNumber, basicSalary, otHours, date } = req.body;

    try {
        // Correct variable name (updateemployeeSalary)
        const updatedEmployeeSalary = await EmployeeSalary.findByIdAndUpdate(req.params.employeeSalaryid, 
            { employeename, employeeID, accountNumber, basicSalary, otHours, date }, 
            { new: true }
        );

        if (!updatedEmployeeSalary) {
            return res.status(404).json({ error: "Salary not found" });
        }

        res.json({ message: "Salary updated successfully", employeeSalary: updatedEmployeeSalary });
    } catch (err) {
        res.status(500).json({ error: "Failed to update salary", details: err.message });
    }
});

// Delete salary
router.delete("/delete/:employeeSalaryid", async (req, res) => {
    try {
        const deletedEmployeeSalary = await EmployeeSalary.findByIdAndDelete(req.params.employeeSalaryid);
        if (!deletedEmployeeSalary) {
            return res.status(404).json({ error: "Salary not found" });
        }
        res.json({ message: "Salary deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete salary", details: err.message });
    }
});

module.exports = router;