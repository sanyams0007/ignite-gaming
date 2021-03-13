const express = require("express");
const router = new express.Router();

const { getProducts } = require("../controllers/productController");

router.get("/products", getProducts);

module.exports = router;
