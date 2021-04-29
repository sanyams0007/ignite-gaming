import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import MetaData from "../layout/MetaData";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme) => ({
  top_heading: {
    margin: "25px auto",
  },
  container: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    fontSize: "12rem",
    fill: "#83e85a",
  },
  message: {
    margin: "20px 0",
    textAlign: "center",
  },
  link: {
    color: "#007bff!important",
    textDecoration: "underline!important",
  },
}));

const OrderSuccess = () => {
  const classes = useStyles();
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
        style={{ margin: "0 auto", border: "3px solid coral" }}
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
            Your Order has been placed successfully.
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
