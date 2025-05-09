const express = require("express");
const router = express.Router();
const EmployeeSalary = require("../models/esalary");

// Add salary
router.post("/add", async (req, res) => {
  const { employeename, accountNumber, basicSalary, date } = req.body;

  if (!employeename || !accountNumber || !basicSalary || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newEmployeeSalary = new EmployeeSalary({ employeename, accountNumber, basicSalary, date });
    await newEmployeeSalary.save();
    res.json({ message: "Salary added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add salary", details: err.message });
  }
});

// View all salaries
router.get("/displaySalary", async (req, res) => {
  try {
    const employeeSalaries = await EmployeeSalary.find();
    res.json(employeeSalaries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch salaries", details: err.message });
  }
});

// Update salary
router.put("/update/:employeeSalaryid", async (req, res) => {
  const { employeename, accountNumber, basicSalary, date } = req.body;

  try {
    const updatedEmployeeSalary = await EmployeeSalary.findByIdAndUpdate(
      req.params.employeeSalaryid,
      { employeename, accountNumber, basicSalary, date },
      { new: true }
    );

    if (!updatedEmployeeSalary) {
      return res.status(404).json({ error: "Salary record not found" });
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
      return res.status(404).json({ error: "Salary record not found" });
    }
    res.json({ message: "Salary deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete salary", details: err.message });
  }
});

module.exports = router;
