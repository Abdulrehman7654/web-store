// Load environment variables FIRST - before anything else
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/dbConnect');
const productRoutes = require('./routes/productUpload');
const productGet = require("./routes/productGet");
const orderRoutes = require("./routes/orderRoutes");
const emailRoute = require("./routes/emailNotificationRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

console.log('=== Environment Variables Check ===');
console.log('Email User:', process.env.EMAIL_USER || '❌ NOT SET');
console.log('Email Password:', process.env.EMAIL_PASSWORD ? '✅ SET' : '❌ NOT SET');
console.log('==================================');

// Routes
app.use("/api", productRoutes);
app.use("/api", productGet);
app.use("/api", orderRoutes); 
app.use("/api", emailRoute);

// Base route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);  // Fixed template literal
});