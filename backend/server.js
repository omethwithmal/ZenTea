const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Environment variables
const PORT = process.env.PORT || 8070;
const MONGODB_URL = process.env.MONGODB_URL;

// MongoDB connection
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(" MongoDB Connected Successfully!"))
    .catch((err) => console.error(" MongoDB Connection Failed:", err.message));

// Import routes
const taskRouter = require("./TaskManagement/routers/tasks");
app.use("/task", taskRouter);

const userRouter = require("./UserManagement/routes/addusers");
app.use("/user", userRouter);

const attendanceRouter = require("./Attendance/routes/attendances");
app.use("/attendance", attendanceRouter);

const orderRouter = require("./OrderManagement/Routes/OrderRoutes");
app.use("/order", orderRouter);

const esalaryRouter = require("./EmployeeSalary/routes/esalarys");
app.use("/esalarys", esalaryRouter);

const router1 = require("./EquipmentMaintenanceManagement/Routes/MaintenanceRoutes");
app.use("/maintenances", router1);

const router2 = require("./EquipmentMaintenanceManagement/Routes/IssueRoutes");
app.use("/issues", router2);

const loginSignRoutes = require("./LoginSignup/router");
app.use("/login", loginSignRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to the ZenTea Task Management API ");
});

// Start the server
app.listen(PORT, () => {
    console.log(` Server is running on port: ${PORT}`);
});
