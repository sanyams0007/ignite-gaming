import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "material-react-toastify";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import OrdersTable from "../custom/Table";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  allOrders,
  clearErrors,
  deleteOrder,
} from "../../actions/orderActions";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrdersList = ({ history, match }) => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.allOrders);
  const { isDeleted } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(allOrders());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Order deleted successfully");
      history.push(match.path);
      dispatch({ type: DELETE_ORDER_RESET });
    }
  }, [error, dispatch, isDeleted, history, match.path]);

  const rows = [];

  orders &&
    orders.forEach((order) => {
      rows.push({
        ID: order._id,
        Amount: order.totalPrice,
        ItemCount: order.orderItems.length,
        Status: order.orderStatus,
        Date: order.createdAt,
        Actions: order._id,
      });
    });

  const columns = [
    { id: "ID", label: "Order ID", minWidth: 170 },
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
      id: "Actions",
      label: "Actions",
      minWidth: 100,
      align: "right",
      format: (value) => (
        <>
          <IconButton aria-label="details">
            <Link to={`order/${value}`}>
              <VisibilityIcon color="primary" />
            </Link>
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => deleteOrderHandler(value)}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </>
      ),
    },
  ];

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  return (
    <>
      <MetaData title={"All Orders"} />
      {loading ? (
        <Loader />
      ) : (
        <Grid
          item
          xs={12}
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
              All <span>Orders</span>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <OrdersTable columns={columns} rows={rows} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default OrdersList;
