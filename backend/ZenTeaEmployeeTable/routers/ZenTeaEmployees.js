const express = require("express");
const router = express.Router();
const Employee = require("../models/ZenTeaEmployee"); // Model file name

// ✅ ADD a new employee
router.post("/add", async (req, res) => {
    const {
        firstName,
        lastName,
        employeeID,
        birthday,
        contactNumber,
        email,
        homeAddress,
        nationalID,
        startDate,
        jobTitle,
        department,
    } = req.body;

    try {
        const newEmp = new Employee({
            firstName,
            lastName,
            employeeID,
            birthday,
            contactNumber,
            email,
            homeAddress,
            nationalID,
            startDate,
            jobTitle,
            department,
        });

        await newEmp.save();
        res.json({ message: "Employee added successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to add employee", details: err.message });
    }
});

// ✅ UPDATE employee
router.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedEmp = await Employee.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedEmp) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.json({ message: "Employee updated successfully!", employee: updatedEmp });
    } catch (err) {
        res.status(500).json({ error: "Failed to update employee", details: err.message });
    }
});

// ✅ DELETE employee
router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEmp = await Employee.findByIdAndDelete(id);
        if (!deletedEmp) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.json({ message: "Employee deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete employee", details: err.message });
    }
});

// ✅ GET all employees
router.get("/", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch employees", details: err.message });
    }
});

// ✅ GET single employee by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch employee", details: err.message });
    }
});

module.exports = router;
