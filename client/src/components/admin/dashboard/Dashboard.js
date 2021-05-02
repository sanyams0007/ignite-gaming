import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ListItems from "./ListItems";

import MetaData from "../../layout/MetaData";
import Loader from "../../layout/Loader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductsList from "../ProductsList";

//import Chart from "./Chart";
//import Deposits from "./Deposits";
//import Orders from "./Orders";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
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
  appBar: {
    position: "absolute",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
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
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
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
  },
}));

export default function Dashboard(props) {
  const { path } = props.match;
  console.log(path);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
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
        <div className={classes.appBarSpacer}>
          <Typography
            align="center"
            component="h2"
            variant="h2"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Admin <span>Dashboard</span>
          </Typography>
        </div>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}></Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}></Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper}></Paper>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  };

  return (
    <>
      <MetaData title={"Welcome to Dashboard"} />
      <Grid xs={12} className={classes.root}>
        {/*  <div className={classes.root}> */}
        {/* <CssBaseline /> */}
        {/* <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar> */}
        {/* Chart */}
        {/* <Chart /> */}
        {/* <Deposits /> */}
        {/* <Orders /> */}
        {/* Recent Deposits */}
        {/* Recent Orders */}
        {/* <Container  className={clsx(classes.appBar, open && classes.appBarShift)} ></Container> */}
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
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

        {/* <Link to="/admin">Home</Link> */}
        <main className={classes.content}>
          <Route exact path={`${path}`} component={defaultDashboard} />
          <Route path={`${path}/admin/products`} component={ProductsList} />
        </main>

        {/* <Route exact path="/admin">
            <Random />
          </Route>
          <Route exact path="/admin">
            <Random />
          </Route> */}

        {/* <main className={classes.content}>
          <div className={classes.appBarSpacer}>
            <Typography
              align="center"
              component="h2"
              variant="h2"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Admin <span>Dashboard</span>
            </Typography>
          </div>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}></Paper>
              </Grid>

              <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}></Paper>
              </Grid>

              <Grid item xs={12}>
                <Paper className={classes.paper}></Paper>
              </Grid>
            </Grid>
          </Container>
        </main> */}
      </Grid>
    </>
  );
}
