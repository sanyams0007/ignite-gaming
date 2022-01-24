const express = require("express");
const path = require("path");
const app = express();

// Middleware
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const errorMiddleware = require("./middlewares/errors");

//Setting up config file and middlewares
dotenv.config({ path: "server/config/config.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Routers
const products = require("./routes/product");
const auth = require("./routes/auth");
const payment = require("./routes/payment");
const order = require("./routes/order");

// API Routes
app.get("/apiVersion", (req, res) => res.send("Ignite Store API V1"));
app.use("/api", products);
app.use("/api", auth);
app.use("/api", payment);
app.use("/api", order);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  });
}

// Middle to handle errors
// Note: MUST COME AT LAST BEFORE EXPORTING APP
app.use(errorMiddleware);

module.exports = app;
