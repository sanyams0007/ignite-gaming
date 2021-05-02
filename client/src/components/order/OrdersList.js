import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import ToastAlert from "../layout/ToastAlert";
import OrderTable from "./OrderTable";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { myOrders } from "../../actions/orderActions";

const OrdersList = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());
  }, [error, dispatch]);

  const rows = [];

  orders &&
    orders.forEach((order) => {
      rows.push({
        OrderID: order._id,
        Amount: order.totalPrice,
        ItemCount: order.orderItems.length,
        Status: order.orderStatus,
        Date: order.createdAt,
        Detail: `/order/${order._id}`,
      });
    });

  return (
    <>
      <MetaData title={"My Orders"} />
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
          style={{ margin: "0 auto", border: "3px solid blue" }}
        >
          <Grid item xs={12}>
            <Typography
              align="center"
              variant="h2"
              component="h2"
              style={{ margin: "20px 0" }}
            >
              My <span>Orders</span>
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ border: "3px solid green" }}>
            <OrderTable rows={rows} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default OrdersList;
