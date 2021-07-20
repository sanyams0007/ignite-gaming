import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "material-react-toastify";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

import { getOrderDetails, clearErrors } from "../../actions/orderActions";

const OrderDetail = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { loading, error, order } = useSelector((state) => state.orderDetails);

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
            <Typography variant="h4" component="h4">
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
          <Grid item xs={12} md={3}>
            <Typography variant="h6" component="h6">
              Payment :
              <b>
                {order.paymentInfo && order.paymentInfo.status === "succeeded"
                  ? " PAID"
                  : " NOT PAID"}
              </b>
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" component="h4">
              Order Status : <b>{order.orderStatus && order.orderStatus}</b>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="h4" gutterBottom>
              Order Items:
            </Typography>

            {order.orderItems &&
              order.orderItems.map((item) => (
                <div key={item.product}>
                  <Divider />
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    my={2}
                    padding="20px 0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        justifySelf: "flex-start",
                        maxWidth: "100px",
                        width: "100%",
                      }}
                    />

                    <Typography component="p">{item.name}</Typography>
                    <Typography component="p">{`$ ${item.price}`}</Typography>
                    <Typography component="p">
                      {`${item.quantity} Unit`}
                    </Typography>
                  </Box>
                </div>
              ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default OrderDetail;
