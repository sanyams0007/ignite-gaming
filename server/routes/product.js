const express = require("express");
const router = new express.Router();
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/products", getProducts);
router.get("/product/:id", getSingleProduct);

// Admin routes
router.post("/admin/product/new", newProduct);
router.put("/admin/product/:id", updateProduct);
router.delete("/admin/product/:id", deleteProduct);

module.exports = router;
