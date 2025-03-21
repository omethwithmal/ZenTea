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
const URL = process.env.MONGODB_URL;

// MongoDB connection
mongoose.connect(URL)
    .then(() => {
        console.log("MongoDB Connection success!");
    })
    .catch((err) => {
        console.error("MongoDB Connection failed:", err.message);
    });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});