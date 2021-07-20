import { Link } from "react-router-dom";

import MetaData from "../layout/MetaData";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { OrderSuccessStyle } from "./cartStyles";

const OrderSuccess = () => {
  const classes = OrderSuccessStyle();
  return (
    <>
      <MetaData title="Order Success" />
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        lg={5}
        container
        alignContent="flex-start"
        style={{ margin: "0 auto" }}
      >
        <Grid item xs={12}>
          <Typography
            align="center"
            variant="h2"
            className={classes.top_heading}
            component="h2"
          >
            Order <span>Success</span>
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.container}>
          <CheckCircleIcon className={classes.icon} />
          <Typography variant="h4" component="h4" className={classes.message}>
            Thank you for your order. Your Order has been placed successfully.
          </Typography>

          <Link className={classes.link} to="/orders/me">
            Go to Orders
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderSuccess;
