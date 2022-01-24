import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "material-react-toastify";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import OrderTable from "../custom/Table";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { myOrders, clearErrors } from "../../actions/orderActions";

const OrdersList = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
      return;
    }

    dispatch(myOrders());
  }, [error, dispatch]);

  const rows = [];

  orders &&
    orders.forEach((order) => {
      rows.push({
        ID: order._id,
        Amount: order.totalPrice,
        ItemCount: order.orderItems.length,
        Status: order.orderStatus,
        Date: order.createdAt,
        Detail: `/order/${order._id}`,
      });
    });

  rows.sort((a, b) => new Date(b.Date) - new Date(a.Date));

  const columns = [
    { id: "ID", label: "OrderID", minWidth: 170 },
    { id: "ItemCount", label: "No of Items", minWidth: 50 },
    {
      id: "Amount",
      label: "Amount",
      minWidth: 100,
      align: "left",
      format: (value) => `$ ${value.toLocaleString("en-US")}`,
    },
    {
      id: "Status",
      label: "Status",
      minWidth: 100,
      align: "right",
      format: (value) =>
        String(value).includes("Delivered") ? (
          <span style={{ color: "green" }}>
            {value.toLocaleString("en-US")}
          </span>
        ) : (
          <span style={{ color: "red" }}>{value.toLocaleString("en-US")}</span>
        ),
    },
    {
      id: "Date",
      label: "Placed On",
      minWidth: 100,
      align: "right",
      format: (value) => new Date(value).toLocaleDateString(),
    },
    {
      id: "Detail",
      label: "More Info.",
      minWidth: 100,
      align: "right",
      format: (value) => <Link to={value}>Detail</Link>,
    },
  ];

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
          style={{ margin: "0 auto" }}
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
          <Grid item xs={12}>
            <OrderTable columns={columns} rows={rows} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default OrdersList;
