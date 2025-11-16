const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb+srv://root:root@cluster0.zutiyhk.mongodb.net/")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// API routes
app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
