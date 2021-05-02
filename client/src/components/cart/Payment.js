import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
//import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";

import ToastAlert from "../layout/ToastAlert";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createOrder, clearErrors } from "../../actions/orderActions";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    "& .MuiInputBase-input": {
      color: "#dd22cc",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid #fff",
    },
    "& .MuiSvgIcon-root": {
      fill: "#fff",
    },
  },
}));

export default function Payment({ prev }) {
  //const classes = useStyles();
  const [disable, setDisable] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state) => state.auth);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);
  shippingInfo && console.log(shippingInfo);

  useEffect(() => {}, []);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemsPrice = orderInfo.invoiceSubtotal;
    order.shippingPrice = orderInfo.invoiceShipping;
    order.taxPrice = orderInfo.invoiceTaxes;
    order.totalPrice = orderInfo.invoiceTotal;
  }

  const paymentData = {
    description: "Software development services",
    shipping: {
      name: `${shippingInfo.firstName} ${shippingInfo.lastName} `,
      address: {
        line1: `${shippingInfo.address}`,
        postal_code: `${shippingInfo.postalCode}`,
        city: `${shippingInfo.city}`,
        country: `${shippingInfo.country}`.split("-")[1],
      },
    },
    amount: Math.round(orderInfo.invoiceTotal * 100),
    currency: "usd",
    payment_method_types: ["card"],
  };

  // card no: 4000 0027 6000 3184

  const handlePayment = async (e) => {
    e.preventDefault();

    setDisable(true);

    let res;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      res = await axios.post("/api/payment/process", paymentData, config);

      const clientSecret = res.data.client_secret;

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        console.log(result.error.message);
        setDisable(false);
      } else {
        // the payment is processed or not
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          history.push("/success");
        } else {
          console.log("There is some issue while payment processing");
        }
      }
    } catch (error) {
      console.log(error.response.data.message);
      setDisable(false);
    }
  };

  return (
    <>
      <MetaData title="Payment" />
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Payment method
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <InputLabel shrink htmlFor="cardNumber">
          Card Number
        </InputLabel>
        <Box bgcolor="#fff">
          <CardNumberElement type="text" id="cardNumber" fullWidth />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <InputLabel shrink htmlFor="expDate">
          Card Expiry
        </InputLabel>
        <Box bgcolor="#fff">
          <CardExpiryElement
            type="text"
            required
            id="expDate"
            fullWidth
            autoComplete="cc-exp"
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <InputLabel shrink htmlFor="cvv">
          Card CVV / CVC
        </InputLabel>
        <Box bgcolor="#fff">
          <CardCvcElement
            type="text"
            id="cvv"
            fullWidth
            autoComplete="cc-csc"
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            disabled={disable}
            onClick={prev}
            variant="contained"
            color="primary"
          >
            Back
          </Button>
          <Button
            disabled={disable}
            onClick={handlePayment}
            variant="contained"
            color="primary"
          >
            Pay {` $${orderInfo && orderInfo.invoiceTotal}`}
          </Button>
        </Box>
      </Grid>
      {error && <ToastAlert message={error} severity="error" />}
    </>
  );
}
