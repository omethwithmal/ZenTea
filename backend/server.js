const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const path = require('path'); // Load environment variables

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Explicitly allow the frontend origin
  credentials: true, // Allow cookies and credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  
};
app.use(cors(corsOptions));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Middleware
app.use(bodyParser.json());

// Environment variables
const PORT = process.env.PORT || 8070;
const MONGODB_URL = process.env.MONGODB_URL;

// MongoDB connection
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => console.error("MongoDB Connection Failed:", err.message));

// Import routes
const taskRouter = require("./TaskManagement/routers/tasks");
app.use("/task", taskRouter);

const userRouter = require("./UserManagement/routes/addusers");
app.use("/user", userRouter);

const ZenTeaEmployees = require("./ZenTeaEmployeeTable/routers/ZenTeaEmployees");
app.use("/ZenTeaEmployees", ZenTeaEmployees);

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

const EmployeeLoginSignupRoutes = require("./EmployeeLoginSignup/router");
app.use("/employee", EmployeeLoginSignupRoutes);

const router3 = require('./itemManagement/router');
app.use('/api',router3);

const router4 = require('./inventoryManagement/router');
app.use('/api',router4);

const router = require("./EquipmentMaintenanceManagement/Routes/EquipmentRoutes");
app.use("/equipments", router); 


// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the ZenTea Task Management API");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});