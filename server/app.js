const express = require("express");
const app = express();

// Middleware
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const fileUpload = require("express-fileupload");

const errorMiddleware = require("./middlewares/errors");

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Routers
const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");

// API Routes
app.get("/", (req, res) => res.send("Ignite store API"));
app.use("/api", products);
app.use("/api", auth);
app.use("/api", order);
app.use(errorMiddleware);

module.exports = app;
