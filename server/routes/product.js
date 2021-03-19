const express = require("express");
const router = new express.Router();
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

// User routes
router.get("/products", isAuthenticatedUser, getProducts);
router.get("/product/:id", getSingleProduct);

// Admin routes
router.post(
  "/admin/product/new",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  newProduct
);
router.put(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProduct
);
router.delete(
  "/admin/product/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProduct
);

module.exports = router;
