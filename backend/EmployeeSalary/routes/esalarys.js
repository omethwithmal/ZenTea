const express = require("express");
const router = express.Router();

const EmployeeSalary = require("../models/esalary");  // Ensure this model does not include 'otHours'

// Add salary
router.post("/add", async (req, res) => {
    const { employeename, employeeID, accountNumber, basicSalary, date } = req.body;

    // Validate required fields
    if (!employeename || !employeeID || !accountNumber || !basicSalary || !date) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Create new salary record without 'otHours'
        const newEmployeeSalary = new EmployeeSalary({
            employeename,
            employeeID,
            accountNumber,
            basicSalary,
            date
        });

        // Save to database
        await newEmployeeSalary.save();
        res.json({ message: "Salary added successfully" });

    } catch (err) {
        res.status(500).json({ error: "Failed to add salary", details: err.message });
    }
});

// View salary
router.get("/displaySalary", async (req, res) => {
    try {
        const employeeSalary = await EmployeeSalary.find();
        res.json(employeeSalary);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch salary", details: err.message });
    }
});

// Update salary
router.put("/update/:employeeSalaryid", async (req, res) => {
    const { employeename, employeeID, accountNumber, basicSalary, date } = req.body;

    try {
        // Update salary record based on ID
        const updatedEmployeeSalary = await EmployeeSalary.findByIdAndUpdate(
            req.params.employeeSalaryid,
            { employeename, employeeID, accountNumber, basicSalary, date },
            { new: true }
        );

        // If record not found, return error
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

        // If record not found, return error
        if (!deletedEmployeeSalary) {
            return res.status(404).json({ error: "Salary not found" });
        }

        res.json({ message: "Salary deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete salary", details: err.message });
    }
});

module.exports = router;
