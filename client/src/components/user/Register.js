import { Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import { Grid, Typography, Button, Divider } from "@material-ui/core";
import { register } from "../../actions/userActions";
import ToastAlert from "../layout/ToastAlert";
import MetaData from "../layout/MetaData";
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
    padding: "20px 10% 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input_box: {
    width: "100%",
    margin: "20px 0 5px",
  },
  line: {
    alignSelf: "normal",
  },
  label: {
    fontSize: 23,
  },
  signup_button: {
    width: "40%",
    fontSize: 18,
    padding: "5px 30px!important",
    margin: "20px 0",
  },
  signin_button: {
    margin: "20px 0 10px",
    fontSize: 18,
  },
  link: {
    fontSize: 18,
  },
}));

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) history.push("/");

    if (error) {
      return;
    }
  }, [dispatch, error, isAuthenticated, history]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };
  return (
    <>
      <MetaData title={"Register User"} />
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
            Sign <span>up</span>
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.form_container}>
          <form>
            <FormControl className={classes.input_box}>
              <InputLabel shrink htmlFor="name" className={classes.label}>
                Name
              </InputLabel>
              <CustomInput
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl className={classes.input_box}>
              <InputLabel shrink htmlFor="email" className={classes.label}>
                Email
              </InputLabel>
              <CustomInput
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl className={classes.input_box}>
              <InputLabel shrink htmlFor="password" className={classes.label}>
                Password
              </InputLabel>
              <CustomInput
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
            </FormControl>
          </form>
          <Button
            color="primary"
            variant="contained"
            className={classes.signup_button}
            type="submit"
            onClick={handleSubmit}
            disabled={loading ? true : false}
          >
            Sign up
          </Button>
          <Divider className={classes.line} />
          <Typography className={classes.signin_button}>
            Already have an Account?{" "}
            <Link to="/login">
              <Typography
                className={classes.link}
                color="textSecondary"
                component="span"
              >
                Sign In
              </Typography>
            </Link>
          </Typography>
        </Grid>
      </Grid>
      {error && <ToastAlert message={error} severity="error" />}
    </>
  );
};

export default Register;
