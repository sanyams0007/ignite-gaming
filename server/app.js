const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Routers
const products = require("./routes/product");

// API Routes
app.get("/", (req, res) => res.send("Ignite store API"));
app.use("/api", products);

module.exports = app;
