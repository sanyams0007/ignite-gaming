const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const paypal = require("@paypal/checkout-server-sdk");
const Environment =
  process.env.NODE_ENV === "production"
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment;

const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  )
);

// @route       POST api/stripeapi
// @description  send stripe api key
// @access

exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});

// @route       POST api/payment/process/stripe
// @description  process stripe payments
// @access

exports.processStripePayment = catchAsyncErrors(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    ...req.body,
    metadata: { integration_check: "accept_a_payment" },
  });

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

// @route       POST api/paypalapi
// @description  send paypal api key
// @access

exports.sendPaypalApi = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    paypalApiKey: process.env.PAYPAL_CLIENT_ID,
  });
});

// @route       POST api/payment/process/paypal
// @description  process paypal payments
// @access

exports.processPaypalPayment = catchAsyncErrors(async (req, res, next) => {
  const request = new paypal.orders.OrdersCreateRequest();
  const { itemsPrice, shippingPrice, taxPrice, totalPrice, orderItems } =
    req.body;
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: Number(totalPrice),
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: Number(itemsPrice),
            },
            shipping: {
              currency_code: "USD",
              value: Number(shippingPrice),
            },
            tax_total: {
              currency_code: "USD",
              value: Number(taxPrice),
            },
          },
        },
        items: orderItems.map(({ name, price, quantity }) => {
          return {
            name: name,
            unit_amount: {
              currency_code: "USD",
              value: price,
            },
            quantity: quantity,
          };
        }),
      },
    ],
  });

  try {
    const order = await paypalClient.execute(request);
    res.json({ id: order.result.id });
  } catch (error) {
    console.log(error);
  }
});
