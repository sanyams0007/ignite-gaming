import { useState } from "react";
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

  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    background: "lightgray",
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
    /*  "& .MuiListItem-button:active": {
      backgroundColor: "#141414",
    }, */
  },
}));

export default function Dashboard(props) {
  const { path } = props.match;

  const classes = useStyles();

  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const defaultDashboard = () => {
    return (
      <>
        <Grid
          item
          spacing={2}
          xs={12}
          alignContent="flex-start"
          container
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
              <Paper className={fixedHeightPaper}></Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Paper className={fixedHeightPaper}></Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Paper className={fixedHeightPaper}></Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Paper className={fixedHeightPaper}></Paper>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <Paper className={fixedHeightPaper}></Paper>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };

  return (
    <>
      <MetaData title={"Welcome to Dashboard"} />
      <Grid xs={12} className={classes.root}>
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
