import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";

dotenv.config(); 

const app = express(); 
const PORT = process.env.PORT || 5000;

connectDB(); 

// Middleware
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello from Express backend!');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});


