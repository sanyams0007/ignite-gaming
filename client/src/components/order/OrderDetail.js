import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "material-react-toastify";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import { getOrderDetails, clearErrors } from "../../actions/orderActions";

const OrderDetail = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const {
    loading,
    error,
    order = {},
  } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    dispatch(getOrderDetails(id));

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
      return;
    }
  }, [error, dispatch, id]);

  return (
    <>
      <MetaData title={"Order Detail"} />
      {loading ? (
        <Loader />
      ) : (
        <Grid
          item
          xs={12}
          sm={10}
          alignContent="flex-start"
          container
          spacing={2}
          style={{ margin: "0 auto" }}
        >
          <Grid item xs={12}>
            <Typography
              align="center"
              variant="h2"
              component="h2"
              style={{ margin: "20px 0" }}
            >
              Order <span>Detail</span>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" component="h4">
              Order # {order._id && order._id}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h6" gutterBottom>
              Shipping Info:
            </Typography>
            <Typography component="p" gutterBottom>
              <b> Name : </b>
              {order.shippingInfo &&
                `${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`}
            </Typography>
            <Typography component="p" gutterBottom>
              <b> Email : </b>
              {order.user && order.user.email}
            </Typography>
            <Typography component="p" gutterBottom>
              <b> Phone : </b>
              {order.shippingInfo && order.shippingInfo.phoneNo}
            </Typography>
            <Typography component="p" gutterBottom>
              <b> Address : </b>
              {order.shippingInfo &&
                `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.postalCode}, ${order.shippingInfo.country} `}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="h6" gutterBottom>
              Payment Info:
            </Typography>
            <Typography component="p" gutterBottom>
              <b> Status : </b>
              {order.paymentInfo &&
              (order.paymentInfo.status === "succeeded" ||
                order.paymentInfo.status === "COMPLETED") ? (
                <b style={{ color: "#2cb978", fontSize: "18px" }}> PAID </b>
              ) : (
                <b style={{ color: "red", fontSize: "18px" }}> NOT PAID </b>
              )}
            </Typography>
            <Typography component="p" gutterBottom>
              <b> Mode : </b>
              {order.paymentInfo &&
                order.paymentInfo.provider &&
                order.paymentInfo.provider}
            </Typography>
            <Typography component="p" gutterBottom>
              <b> Transaction ID : </b>
              {order.paymentInfo && order.paymentInfo.id
                ? order.paymentInfo.id
                : "Not Available"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="h4">
              Order Status :{" "}
              {String(order.orderStatus).includes("Delivered") ? (
                <b style={{ color: "#2cb978", fontSize: "18px" }}>
                  {order.orderStatus}
                </b>
              ) : (
                <b style={{ color: "red", fontSize: "18px" }}>
                  {order.orderStatus}
                </b>
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="h4" gutterBottom>
              Order Items:
            </Typography>

            {order.orderItems &&
              order.orderItems.map((item) => (
                <Box
                  key={item.product}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  padding="10px 0"
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

                  <Typography component="span" style={{ padding: "0 5px" }}>
                    {item.name}
                  </Typography>
                  <Typography
                    component="span"
                    style={{ padding: "0 5px" }}
                  >{`$ ${item.price}`}</Typography>
                  <Typography component="span" style={{ padding: "0 5px" }}>
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

export default OrderDetail;
