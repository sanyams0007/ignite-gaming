import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { login } from "../../actions/userActions";
import ToastAlert from "../layout/ToastAlert";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { Grid, Typography, Button, Divider } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

const CustomInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: "30px",
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#f9f9f9",
    fontSize: 20,
    width: "100%",
    padding: "10px 12px",
    "&:focus": {
      backgroundColor: theme.palette.common.white,
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  top_heading: {
    margin: "25px auto",
  },
  form_container: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 10,
    padding: "10% 10% 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input_box: {
    width: "100%",
    margin: "30px 0 5px",
  },
  line: {
    alignSelf: "normal",
  },
  label: {
    fontSize: 23,
  },
  signin_button: {
    width: "40%",
    fontSize: 18,
    padding: "5px 30px!important",
    margin: "20px 0",
  },
  signup_button: {
    margin: "20px 0 10px",
    fontSize: 18,
  },
  forgot_button: {
    alignSelf: "flex-end",
  },
  link: {
    fontSize: 18,
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) history.push("/");

    if (error) {
      return;
    }
  }, [dispatch, error, isAuthenticated, history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      dispatch(login(email, password));
    }
  };
  return (
    <>
      <MetaData title={"Login"} />
      {loading ? (
        <Loader />
      ) : (
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          lg={4}
          container
          alignContent="flex-start"
          style={{ margin: "0 auto", border: "3px solid coral" }}
        >
          <Grid item xs={12}>
            <Typography
              align="center"
              variant="h2"
              className={classes.top_heading}
              component="h2"
            >
              Sign <span>in</span>
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.form_container}>
            <form>
              <FormControl className={classes.input_box}>
                <InputLabel shrink htmlFor="username" className={classes.label}>
                  Email
                </InputLabel>
                <CustomInput
                  type="email"
                  id="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl className={classes.input_box}>
                <InputLabel shrink htmlFor="password" className={classes.label}>
                  Password
                </InputLabel>
                <CustomInput
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </form>
            <Link to="/password/forgot" className={classes.forgot_button}>
              <Typography
                className={classes.link}
                color="textSecondary"
                component="span"
              >
                Forgot Password ?
              </Typography>
            </Link>
            <Button
              color="primary"
              variant="contained"
              className={classes.signin_button}
              type="submit"
              onClick={handleSubmit}
            >
              Sign in
            </Button>
            <Divider className={classes.line} />
            <Typography className={classes.signup_button}>
              Don't have an Account?{" "}
              <Link to="/register">
                <Typography
                  className={classes.link}
                  color="textSecondary"
                  component="span"
                >
                  Sign Up
                </Typography>
              </Link>
            </Typography>
          </Grid>
        </Grid>
      )}
      {error && <ToastAlert message={error} severity="error" />}
    </>
  );
};

export default Login;
