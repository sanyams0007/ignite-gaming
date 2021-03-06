import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { toast } from "material-react-toastify";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";

import { createOrder, clearErrors } from "../../../actions/orderActions";
import { clearCart } from "../../../actions/cartActions";

const options = {
  style: {
    base: {
      fontSize: "18px",
      color: "#424770",
      letterSpacing: "0.025em",
      fontFamily: "Source Code Pro, monospace",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
};

export default function Stripe({ order, blockPrev }) {
  const [disable, setDisable] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state) => state.auth);
  const { shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

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
    amount: Math.round(order.totalPrice * 100),
    currency: "usd",
    payment_method_types: ["card"],
  };

  // card no: 4000 0027 6000 3184

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setDisable(true);
    blockPrev(true);

    let res;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      res = await axios.post(
        "/api/payment/process/stripe",
        paymentData,
        config
      );

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
        toast.error(result.error.message);
        setDisable(false);
        blockPrev(false);
      } else {
        // the payment is processed or not
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            provider: "Stripe",
          };

          dispatch(createOrder(order));
          dispatch(clearCart());
          history.push("/success");
        } else {
          toast.error("There is some issue while payment processing");
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setDisable(false);
      blockPrev(false);
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="body1" color="error" gutterBottom>
          Test Card No: 4000 0027 6000 3184 | Date: any future date | CVV: 007
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <InputLabel shrink htmlFor="cardNumber">
          Card Number
        </InputLabel>
        <CardNumberElement options={options} />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputLabel shrink htmlFor="expDate">
          Card Expiry
        </InputLabel>
        <CardExpiryElement options={options} />
      </Grid>
      <Grid item xs={12} md={6}>
        <InputLabel shrink htmlFor="cvv">
          Card CVV / CVC
        </InputLabel>
        <CardCvcElement options={options} />
      </Grid>

      <Grid item xs={12}>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Button
            disabled={disable}
            onClick={handlePayment}
            variant="contained"
            color="primary"
          >
            Pay {` $ ${order && order.totalPrice}`}
          </Button>
        </Box>
      </Grid>
    </>
  );
}
