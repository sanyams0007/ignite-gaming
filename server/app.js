const express = require("express");
const app = express();

// Middleware
const errorMiddleware = require("./middlewares/errors");
app.use(express.json());

// Routers
const products = require("./routes/product");

// API Routes
app.get("/", (req, res) => res.send("Ignite store API"));
app.use("/api", products);
app.use(errorMiddleware);

module.exports = app;
