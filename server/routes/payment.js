const express = require("express");
const router = express.Router();

const {
  processStripePayment,
  sendStripApi,
  processPaypalPayment,
  sendPaypalApi,
} = require("../controllers/paymentController");

const { isAuthenticatedUser } = require("../middlewares/auth");

router.post(
  "/payment/process/stripe",
  isAuthenticatedUser,
  processStripePayment
);
router.get("/stripeapi", isAuthenticatedUser, sendStripApi);

router.post(
  "/payment/process/paypal",
  isAuthenticatedUser,
  processPaypalPayment
);

router.get("/paypalapi", isAuthenticatedUser, sendPaypalApi);

module.exports = router;
