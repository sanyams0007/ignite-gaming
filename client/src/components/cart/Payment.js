import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import MetaData from "../layout/MetaData";
import StripeScreen from "./payments/Stripe";
import PayPalScreen from "./payments/PayPal";
import COD from "./payments/COD";

import { createOrder, clearErrors } from "../../actions/orderActions";

export default function Payment({ prev }) {
  const [expanded, setExpanded] = useState(false);
  const [stripeApiKey, setStripeApiKey] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [disable, setDisable] = useState(false);

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  const orderItems = cartItems.map((item) => {
    delete item.stock;
    return item;
  });

  const order = {
    orderItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemsPrice = orderInfo.invoiceSubtotal;
    order.shippingPrice = orderInfo.invoiceShipping;
    order.taxPrice = orderInfo.invoiceTaxes;
    order.totalPrice = orderInfo.invoiceTotal;
  }

  useEffect(() => {
    const getStripApiKey = async () => {
      const { data } = await axios.get("/api/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    };
    getStripApiKey();
  }, []);

  return (
    <>
      <MetaData title="Payment" />
      <Grid item xs={12}>
        <Accordion
          expanded={expanded === "stripe"}
          onChange={handleChange("stripe")}
        >
          <AccordionSummary
            style={{ background: "#7069fe" }}
            expandIcon={<ExpandMoreIcon />}
            id="stripe"
          >
            <Typography variant="h6">Pay Using Stripe</Typography>
          </AccordionSummary>
          <Grid
            spacing={1}
            container
            justify="center"
            style={{ margin: "0 auto" }}
          >
            {stripeApiKey && (
              <Elements stripe={loadStripe(stripeApiKey)}>
                <StripeScreen order={order} blockPrev={setDisable} />
              </Elements>
            )}
          </Grid>
        </Accordion>

        <Accordion
          expanded={expanded === "paypal"}
          onChange={handleChange("paypal")}
        >
          <AccordionSummary
            style={{ background: "#0079C1" }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="h6">Pay Using PayPal</Typography>
          </AccordionSummary>

          <PayPalScreen
            order={order}
            createOrder={createOrder}
            clearErrors={clearErrors}
          />
        </Accordion>

        <Accordion expanded={expanded === "cod"} onChange={handleChange("cod")}>
          <AccordionSummary
            style={{ background: "#2cb978" }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="h6">Cash On Delivery</Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{
              justifyContent: "space-between",
              paddingRight: "0px",
            }}
          >
            <COD
              order={order}
              createOrder={createOrder}
              clearErrors={clearErrors}
            />
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item xs={12}>
        <Button
          disabled={disable}
          onClick={prev}
          variant="contained"
          color="primary"
        >
          Back
        </Button>
      </Grid>
    </>
  );
}
