import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "material-react-toastify";

import { register, clearErrors } from "../../actions/userActions";
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

const Register = () => {
  const registerStyle = signInOutStyles();
  const containerStyle = containerStyles();
  const classes = commonStyles();

  const dispatch = useDispatch();
  const history = useHistory();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) history.push("/");

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
      return;
    }
  }, [toast, dispatch, error, isAuthenticated, history]);

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
      <MetaData title={"Register New User"} />
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
        <Grid
          item
          xs={12}
          className={containerStyle.container}
          style={{ paddingTop: "5%" }}
        >
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
          <Button
            color="primary"
            variant="contained"
            className={containerStyle.button}
            type="submit"
            onClick={handleSubmit}
            disabled={loading ? true : false}
          >
            Sign up
          </Button>
          <Divider className={registerStyle.line} />
          <Typography className={registerStyle.link_text}>
            Already have an Account?{" "}
            <Link to="/login">
              <Typography
                className={registerStyle.link}
                color="textSecondary"
                component="span"
              >
                Sign In
              </Typography>
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
