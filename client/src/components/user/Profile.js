import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Grid, Typography, Button, Box } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

const useStyles = makeStyles({
  top_heading: {
    margin: "25px auto",
  },
  container: {
    border: "3px solid blue",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  avatar: {
    width: "250px",
    height: "250px",
  },
  box: {
    margin: "20px 10px",
  },
  button: {
    borderRadius: 10,
  },
});

const Profile = () => {
  const classes = useStyles();
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <>
      <MetaData title={"Profile"} />
      {loading ? (
        <Loader />
      ) : (
        <Grid
          item
          xs={12}
          sm={10}
          container
          alignContent="flex-start"
          style={{ margin: "0 auto 8%", border: "3px solid coral" }}
        >
          <Grid item xs={12}>
            <Typography
              align="center"
              variant="h2"
              className={classes.top_heading}
              component="h2"
            >
              My <span>Profile</span>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            className={classes.container}
            alignItems="center"
          >
            <Avatar
              alt={user && user.name}
              src={user.avatar && user.avatar.url}
              className={classes.avatar}
            />
            <Button
              className={classes.box}
              color="secondary"
              variant="contained"
            >
              <Link to="/me/update">Edit Profile</Link>
            </Button>
          </Grid>
          <Grid item xs={12} md={6} className={classes.container}>
            <Box className={classes.box}>
              <Typography variant="h6" component="h6">
                Full Name
              </Typography>
              <Typography color="primary">{user.name}</Typography>
            </Box>
            <Box className={classes.box}>
              <Typography variant="h6" component="h6">
                Email Address
              </Typography>
              <Typography color="primary">{user.email}</Typography>
            </Box>
            <Box className={classes.box}>
              <Typography variant="h6" component="h6">
                Joined On
              </Typography>
              <Typography color="primary">
                {String(user.createdAt).substring(0, 10)}
              </Typography>
            </Box>
            <Box
              className={classes.box}
              display="flex"
              justifyContent="space-around"
            >
              {user.role !== "admin" ? (
                <Button color="secondary" variant="contained">
                  <Link to="/orders/me">My Orders</Link>
                </Button>
              ) : (
                <Button color="secondary" variant="contained">
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              )}

              <Button color="secondary" variant="contained">
                <Link to="/password/update">Change Password</Link>
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Profile;
