import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { Grid, Typography, Button } from "@material-ui/core";
import { forgotPassword } from "../../actions/userActions";
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

const useStyles = makeStyles({
  top_heading: {
    margin: "25px auto",
  },
  container: {
    border: "3px solid blue",
    padding: "50px",
  },
  box: {
    margin: "20px 10px",
  },
  input_box: {
    width: "100%",
    margin: "25px 0",
  },
  label: {
    fontSize: 23,
  },
});

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      return;
    }

    if (message) {
      return;
    }
  }, [dispatch, error, message]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(email));
  };
  return (
    <>
      <MetaData title="Forgot Password" />
      <Grid
        item
        xs={12}
        sm={10}
        container
        justify="center"
        style={{ margin: "0 auto 12%", border: "3px solid coral" }}
      >
        <Grid item xs={12}>
          <Typography
            align="center"
            variant="h2"
            className={classes.top_heading}
            component="h2"
          >
            Forgot <span>Password</span>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10} md={6} className={classes.container}>
          <form align="center" onSubmit={handleSubmit}>
            <FormControl className={classes.input_box}>
              <InputLabel shrink htmlFor="email" className={classes.label}>
                Enter Your Registered Email
              </InputLabel>
              <CustomInput
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <Button
              className={classes.box}
              color="secondary"
              variant="contained"
              type="submit"
              disabled={loading ? true : false}
            >
              Send Email
            </Button>
          </form>
        </Grid>
      </Grid>
      {error && <ToastAlert message={error} severity="error" />}
    </>
  );
};

export default ForgotPassword;
