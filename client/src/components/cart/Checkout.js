import { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

// Payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Shipping from "./Shipping";
import Grid from "@material-ui/core/Grid";
import ReviewOrder from "./ReviewOrder";
import Payment from "./Payment";
//import Review from "./Review";

const useStyles = makeStyles((theme) => ({
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Shipping address", "Review your order", "Payment details"];

export default function Checkout() {
  const classes = useStyles();

  const [stripeApiKey, setStripeApiKey] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    const getStripApiKey = async () => {
      const { data } = await axios.get("/api/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    };

    getStripApiKey();
  }, []);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Shipping next={handleNext} />;
      case 1:
        return <ReviewOrder prev={handleBack} next={handleNext} />;
      case 2:
        return (
          stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment prev={handleBack} />
            </Elements>
          )
        );

      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <Grid
      item
      xs={12}
      sm={10}
      lg={10}
      container
      justify="center"
      style={{ margin: "0 auto", border: "3px solid brown" }}
    >
      <Grid item xs={12}>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
      </Grid>
      <Grid item xs={12} md={8}>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
      <>
        {activeStep === steps.length ? (
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              Your order number is #2001539. We have emailed your order
              confirmation, and will send you an update when your order has
              shipped.
            </Typography>
          </Grid>
        ) : (
          <Grid
            item
            spacing={3}
            xs={12}
            md={10}
            lg={8}
            container
            justify="center"
            style={{ margin: "0 auto" }}
          >
            {getStepContent(activeStep)}
            {/* <Grid item xs={12} justify="space-evenly">
              {activeStep !== 0 && (
                <Button onClick={handleBack} className={classes.button}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Place order" : "Continue"}
              </Button>
            </Grid> */}
          </Grid>
        )}
      </>
    </Grid>
  );
}
