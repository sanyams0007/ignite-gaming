const express = require("express");
const app = express();

// Middleware
const cookieParser = require("cookie-parser");
//const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const errorMiddleware = require("./middlewares/errors");

//Setting up config file and middlewares
dotenv.config({ path: "server/config/config.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Routers
const products = require("./routes/product");
const auth = require("./routes/auth");
const payment = require("./routes/payment");
const order = require("./routes/order");

// API Routes
app.get("/", (req, res) => res.send("Ignite Store API"));
app.use("/api", products);
app.use("/api", auth);
app.use("/api", payment);
app.use("/api", order);

// Middle to handle errors 
// Note: MUST COME AT LAST BEFORE EXPORTING APP
app.use(errorMiddleware);

module.exports = app;
