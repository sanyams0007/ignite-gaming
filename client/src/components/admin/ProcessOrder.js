import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "material-react-toastify";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { useStyles } from "../cart/cartStyles";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import {
  getOrderDetails,
  updateOrder,
  clearErrors,
} from "../../actions/orderActions";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

const ProcessOrder = ({ match }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { loading, order = {} } = useSelector((state) => state.orderDetails);
  const { error, isUpdated } = useSelector((state) => state.order);
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    taxPrice,
    shippingPrice,
    orderStatus,
    itemsPrice,
  } = order;

  const [status, setStatus] = useState(orderStatus ? orderStatus : "");

  const orderId = match.params.id;
  const orderState = ["Processing", "Shipped", "Delivered"];

  const handleSubmit = (id) => {
    const formData = new FormData();
    formData.set("status", status);

    dispatch(updateOrder(id, formData));
  };

  useEffect(() => {
    dispatch(getOrderDetails(orderId));

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Order updated successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [error, dispatch, isUpdated, orderId]);

  useEffect(() => {
    if (orderStatus) setStatus(orderStatus);
  }, [orderStatus]);

  return (
    <>
      <MetaData title={`Process Order # ${order && order._id}`} />
      {loading ? (
        <Loader />
      ) : (
        <Grid
          item
          xs={12}
          sm={10}
          alignContent="flex-start"
          container
          spacing={3}
          style={{ margin: "0 auto" }}
        >
          <Grid item xs={12}>
            <Typography
              align="center"
              variant="h2"
              component="h2"
              style={{ margin: "20px 0" }}
            >
              Process <span>Order</span>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" component="h4">
              Order ID # {order._id && order._id}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography
              color="secondary"
              variant="h6"
              component="h6"
              gutterBottom
            >
              <b> Shipping Info.</b>
            </Typography>
            <Typography component="p" gutterBottom>
              <b> Name : </b>
              {shippingInfo &&
                `${shippingInfo.firstName} ${shippingInfo.lastName}`}
            </Typography>
            <Typography component="p" gutterBottom>
              <b> Email : </b>
              {user && user.email}
            </Typography>
            <Typography component="p" gutterBottom>
              <b> Phone : </b>
              {shippingInfo && shippingInfo.phoneNo}
            </Typography>
            <Typography component="p" gutterBottom>
              <b> Address : </b>
              {shippingInfo &&
                `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country} `}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography color="secondary" variant="h6" component="h6">
              <b>Payment Info.</b>
            </Typography>
            <Typography component="p" gutterBottom>
              <b> Subtotal : </b>
              {`$ ${itemsPrice}`}
            </Typography>

            <Typography component="p" gutterBottom>
              <b> Shipping : </b>
              {`$ ${shippingPrice}`}
            </Typography>
            <Typography component="p" gutterBottom>
              <b> Tax : </b>
              {`$ ${taxPrice}`}
            </Typography>
            <Typography component="p" gutterBottom>
              <b> Total : </b>
              {`$ ${totalPrice}`}
            </Typography>
            <Typography component="p" gutterBottom>
              <b> Status : </b>
              {paymentInfo &&
              (paymentInfo.status === "succeeded" ||
                order.paymentInfo.status === "COMPLETED") ? (
                <span style={{ color: "green" }}>PAID</span>
              ) : (
                <span style={{ color: "red" }}>NOT PAID</span>
              )}
            </Typography>
            <Typography component="p" gutterBottom>
              <b> Transaction ID : </b>
              {paymentInfo && paymentInfo.id ? paymentInfo.id : "Not Available"}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography color="secondary" variant="h6" component="h4">
              <b> Order Info. </b>
            </Typography>
            <Typography component="p" gutterBottom>
              <b> Status : </b>
              {String(orderStatus).includes("Delivered") ? (
                <span style={{ color: "green" }}>{orderStatus}</span>
              ) : (
                <span style={{ color: "red" }}>{orderStatus}</span>
              )}
            </Typography>
            <Typography component="p" gutterBottom>
              <b> Placed On : </b>
              {new Date(order.createdAt).toDateString()}
            </Typography>

            <TextField
              className={classes.root}
              required
              select
              id="status"
              name="status"
              fullWidth
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ margin: "15px 0" }}
            >
              {orderState.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
            <Button
              onClick={() => handleSubmit(order._id)}
              variant="contained"
              color="primary"
              disabled={loading ? true : false}
            >
              Update Status
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Typography
              color="secondary"
              variant="h6"
              component="h4"
              gutterBottom
            >
              <b>Order Items</b>
            </Typography>

            {orderItems &&
              orderItems.map((item) => (
                <Box
                  display="flex"
                  alignItems="center"
                  padding="10px 0"
                  justifyContent="space-between"
                  key={item.product}
                  borderTop="1px solid rgba(255, 255, 255, 0.12)"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      justifySelf: "flex-start",
                      maxWidth: "70px",
                      width: "100%",
                    }}
                  />

                  <Typography component="p">{item.name}</Typography>
                  <Typography component="p">{`$ ${item.price}`}</Typography>
                  <Typography component="p">
                    {`${item.quantity} Unit`}
                  </Typography>
                </Box>
              ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ProcessOrder;
