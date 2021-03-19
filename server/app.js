const express = require("express");
const app = express();

// Middleware
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errors");
app.use(express.json());
app.use(cookieParser());

// Routers
const products = require("./routes/product");
const auth = require("./routes/auth");

// API Routes
app.get("/", (req, res) => res.send("Ignite store API"));
app.use("/api", products);
app.use("/api", auth);
app.use(errorMiddleware);

module.exports = app;
