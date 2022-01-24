import { useState } from "react";

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";
import Shipping from "./Shipping";
import Grid from "@material-ui/core/Grid";
import ReviewOrder from "./ReviewOrder";
import Payment from "./Payment";

import { checkoutStyle } from "./cartStyles";

const steps = ["Shipping address", "Review your order", "Payment details"];

export default function Checkout() {
  const classes = checkoutStyle();

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Shipping next={handleNext} />;
      case 1:
        return <ReviewOrder prev={handleBack} next={handleNext} />;
      case 2:
        return <Payment prev={handleBack} />;
      default:
        return <Shipping next={handleNext} />;
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
      style={{ margin: "0 auto" }}
    >
      <Grid item xs={12}>
        <Typography
          align="center"
          variant="h2"
          component="h2"
          style={{ margin: "20px 0" }}
        >
          Check-<span>out</span>
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
        </Grid>
      </>
    </Grid>
  );
}
