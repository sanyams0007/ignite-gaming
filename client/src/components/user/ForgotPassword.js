import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "material-react-toastify";

import { forgotPassword, clearErrors } from "../../actions/userActions";
import MetaData from "../layout/MetaData";

import { Grid, Typography, Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import { CustomInput, commonStyles, containerStyles } from "./userStyle";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const classes = commonStyles();
  const containerStyle = containerStyles();
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
      return;
    }

    if (message) {
      toast.success(message);
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
            Forgot <span>Password</span>
          </Typography>
        </Grid>
        <Grid item xs={12} className={containerStyle.container}>
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
            className={containerStyle.button}
            color="primary"
            variant="contained"
            type="submit"
            onClick={handleSubmit}
            disabled={loading ? true : false}
          >
            Send Email
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ForgotPassword;
