import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "material-react-toastify";

import { resetPassword, clearErrors } from "../../actions/userActions";
import MetaData from "../layout/MetaData";

import { Grid, Typography, Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import { CustomInput, commonStyles, containerStyles } from "./userStyle";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const classes = commonStyles();
  const containerStyle = containerStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { token } = useParams();
  const { loading, error, success } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
      return;
    }

    if (success) {
      toast.success("Password reset successfull");
      history.push("/login");
    }
  }, [toast, dispatch, error, success, history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, formData));
  };
  return (
    <>
      <MetaData title="Reset Password" />
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
            Reset <span>Password</span>
          </Typography>
        </Grid>
        <Grid item xs={12} className={containerStyle.container}>
          <FormControl className={classes.input_box}>
            <InputLabel shrink htmlFor="password" className={classes.label}>
              New Password
            </InputLabel>
            <CustomInput
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <FormControl className={classes.input_box}>
            <InputLabel
              shrink
              htmlFor="confirmpassword"
              className={classes.label}
            >
              Confirm New Password
            </InputLabel>
            <CustomInput
              type="password"
              name="confirmpassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          <Button
            onClick={handleSubmit}
            className={containerStyle.button}
            color="primary"
            variant="contained"
            type="submit"
            disabled={loading ? true : false}
          >
            Reset Password
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ResetPassword;
