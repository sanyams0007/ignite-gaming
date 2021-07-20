import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import { profileStyles } from "./userStyle";

const Profile = () => {
  const classes = profileStyles();
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
          style={{ margin: "0 auto" }}
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
            style={{ alignItems: "center" }}
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
                <Link to="/orders/me">
                  <Button color="secondary" variant="contained">
                    My Orders
                  </Button>
                </Link>
              ) : (
                <Link to="/dashboard">
                  <Button color="secondary" variant="contained">
                    Dashboard
                  </Button>
                </Link>
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
