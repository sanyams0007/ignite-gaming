import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { getAdminProducts } from "../../../actions/productActions";
import { allOrders } from "../../../actions/orderActions";
import { allUsers } from "../../../actions/userActions";

import MetaData from "../../layout/MetaData";
import ProtectedRoute from "../../route/ProtectedRoute";
import ListItems from "./ListItems";

import ProductsList from "../ProductsList";
import NewProduct from "../NewProduct";
import UpdateProduct from "../UpdateProduct";

import UsersList from "../UsersList";
import UpdateUser from "../UpdateUser";

import OrdersList from "../OrdersList";
import ProcessOrder from "../ProcessOrder";

import ProductReviews from "../ProductReviews";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 1,
    margin: "10px 0",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  content: {
    flexGrow: 1,
  },
  cardlink: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  svg: {
    maxHeight: "80px",
  },

  paper: {
    padding: theme.spacing(2, 2, 0, 2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    background: "rgba(255,255,255,.11)",
    justifyContent: "space-evenly",
    textAlign: "center",
  },
  fixedHeight: {
    height: 240,
  },
  sideList: {
    "& .MuiListItem-root": {
      backgroundColor: "transparent",
    },
    "& .MuiSvgIcon-root": {
      fill: "#fff",
    },
    "& .MuiListItem-button:hover": {
      backgroundColor: "#141414",
    },
  },
}));

export default function Dashboard(props) {
  const { path } = props.match;
  const { products } = useSelector((state) => state.products);
  const { orders = [] } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;
  products.forEach((product) => {
    if (product.stock <= 0) {
      outOfStock += 1;
    }
  });

  const totalAmount = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(allOrders());
    dispatch(allUsers());
  }, [dispatch]);

  const defaultDashboard = () => {
    return (
      <>
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
              component="h2"
              variant="h2"
              className={classes.title}
            >
              Admin <span>Dashboard</span>
            </Typography>
          </Grid>

          <Grid item xs={12} container spacing={3} style={{ margin: "0 auto" }}>
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                <Typography variant="h3">Total Amount </Typography>
                <Typography color="primary" variant="h4">
                  <b>$ {totalAmount}</b>
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Typography variant="h4">Products</Typography>
                <Typography color="primary" variant="h4">
                  <b>{products && products.length}</b>
                </Typography>
                <Divider />
                <Link
                  to={`${path}/admin/products`}
                  className={classes.cardlink}
                >
                  <Typography>View Details</Typography>
                  <ChevronRightIcon />
                </Link>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Typography variant="h4">Orders</Typography>
                <Typography color="primary" variant="h4">
                  <b>{orders && orders.length}</b>
                </Typography>
                <Divider />
                <Link to={`${path}/admin/orders`} className={classes.cardlink}>
                  <Typography>View Details</Typography>
                  <ChevronRightIcon />
                </Link>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Typography variant="h4">Users</Typography>
                <Typography color="primary" variant="h4">
                  <b>{users && users.length}</b>
                </Typography>
                <Divider />
                <Link to={`${path}/admin/users`} className={classes.cardlink}>
                  <Typography>View Details</Typography>
                  <ChevronRightIcon />
                </Link>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Typography variant="h4">Out of Stock</Typography>
                <Typography color="primary" variant="h4">
                  <b>{outOfStock}</b>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <>
      <MetaData title={"Welcome to Dashboard"} />
      <Grid item xs={12} className={classes.root}>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
          style={{
            height: "100vh",
            position: "sticky",
            top: "0",
          }}
        >
          {open ? (
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
          ) : (
            <div className={classes.toolbarIcon}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>
            </div>
          )}

          <Divider />
          <div className={classes.sideList}>
            <ListItems path={path} drawerOpen={open} />
          </div>
        </Drawer>

        <main className={classes.content}>
          <ProtectedRoute exact path={`${path}`} component={defaultDashboard} />

          <ProtectedRoute
            exact
            path={`${path}/admin/products`}
            isAdmin={true}
            component={ProductsList}
          />
          <ProtectedRoute
            exact
            path={`${path}/admin/product`}
            isAdmin={true}
            component={NewProduct}
          />
          <ProtectedRoute
            exact
            path={`${path}/admin/product/:id`}
            isAdmin={true}
            component={UpdateProduct}
          />

          <ProtectedRoute
            exact
            path={`${path}/admin/users`}
            isAdmin={true}
            component={UsersList}
          />
          <ProtectedRoute
            exact
            path={`${path}/admin/user/:id`}
            isAdmin={true}
            component={UpdateUser}
          />

          <ProtectedRoute
            exact
            path={`${path}/admin/orders`}
            isAdmin={true}
            component={OrdersList}
          />
          <ProtectedRoute
            exact
            path={`${path}/admin/order/:id`}
            isAdmin={true}
            component={ProcessOrder}
          />

          <ProtectedRoute
            exact
            path={`${path}/admin/reviews`}
            isAdmin={true}
            component={ProductReviews}
          />
        </main>
      </Grid>
    </>
  );
}
