const express = require("express");
const router = express.Router();
const Task = require("../models/task");

// Add Task
router.post("/add", async (req, res) => {
    const { taskID, title, description, employeeName, department, date, timePeriodHours, status } = req.body;
    if (!taskID || !title || !employeeName || !department || !date || !timePeriodHours || !status) {
        return res.status(400).json({ error: "All fields are required" });
    }
    try {
        const newTask = new Task({ taskID, title, description, employeeName, department, date, timePeriodHours, status });
        await newTask.save();
        res.json({ message: "Task added successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to add task", details: err.message });
    }
});

// View Tasks
router.get("/display", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch tasks", details: err.message });
    }
});

// Update Task
router.put("/update/:taskid", async (req, res) => {
    const { title, description, employeeName, department, date, timePeriodHours, status } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.taskid, { title, description, employeeName, department, date, timePeriodHours, status }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json({ message: "Task updated successfully", task: updatedTask });
    } catch (err) {
        res.status(500).json({ error: "Failed to update task", details: err.message });
    }
});

// Delete Task
router.delete("/delete/:taskid", async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.taskid);
        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete task", details: err.message });
    }
});

module.exports = router;