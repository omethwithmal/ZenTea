const express = require("express");
const router = express.Router();
const User = require("../models/adduser");

// Add a new employee
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
    basicSalary,
  } = req.body;

  try {
    const newUser = new User({
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
      basicSalary,
    });
    await newUser.save();
    res.json({ message: "Employee added successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add employee", details: err.message });
  }
});

// View all employees
router.get("/display", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch employees", details: err.message });
  }
});

// Update an employee
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({ message: "Employee updated successfully!", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Failed to update employee", details: err.message });
  }
});

// Delete an employee
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete employee", details: err.message });
  }
});

module.exports = router;