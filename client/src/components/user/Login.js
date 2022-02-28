import { Link, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "material-react-toastify";

import { login, clearErrors } from "../../actions/userActions";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

import { Grid, Typography, Button, Divider } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import {
  CustomInput,
  commonStyles,
  containerStyles,
  signInOutStyles,
} from "./userStyle";
import DemoBox from "./DemoBox";

const Login = () => {
  const loginStyle = signInOutStyles();
  const containerStyle = containerStyles();
  const classes = commonStyles();

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  let { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
      return;
    }
  }, [dispatch, error, isAuthenticated, history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      dispatch(login(email, password));
      history.replace(from);
    }
  };

  const handleDemoUser = () => {
    console.log(
      process.env.REACT_APP_DEMO_USER,
      process.env.REACT_APP_USER_PASS
    );
    dispatch(
      login(process.env.REACT_APP_DEMO_USER, process.env.REACT_APP_USER_PASS)
    );
    history.replace(from);
  };

  const handleDemoAdmin = () => {
    dispatch(
      login(process.env.REACT_APP_DEMO_ADMIN, process.env.REACT_APP_ADMIN_PASS)
    );

    history.replace(from);
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
          style={{ margin: "0 auto" }}
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
          <Grid item xs={12} className={containerStyle.container}>
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
            <Link to="/password/forgot" style={{ alignSelf: "flex-end" }}>
              <Typography
                className={loginStyle.link}
                color="textSecondary"
                component="span"
              >
                Forgot Password ?
              </Typography>
            </Link>
            <Button
              color="primary"
              variant="contained"
              className={containerStyle.button}
              type="submit"
              onClick={handleSubmit}
            >
              Sign in
            </Button>
            <Divider className={loginStyle.line} />
            <Typography className={loginStyle.link_text}>
              Don't have an Account?{" "}
              <Link to="/register">
                <Typography
                  className={loginStyle.link}
                  color="textSecondary"
                  component="span"
                >
                  Sign Up
                </Typography>
              </Link>
            </Typography>
            <DemoBox
              handleDemoAdmin={handleDemoAdmin}
              handleDemoUser={handleDemoUser}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Login;
