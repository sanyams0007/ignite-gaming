import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { Grid, Typography, Button } from "@material-ui/core";
import { updatePassword } from "../../actions/userActions";
import ToastAlert from "../layout/ToastAlert";
import MetaData from "../layout/MetaData";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";

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

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { isUpdated, error, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      return;
    }

    if (isUpdated) {
      history.push("/me");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, isUpdated, history]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("newPassword", newPassword);

    dispatch(updatePassword(formData));
  };
  return (
    <>
      <MetaData title="Update Password" />
      <Grid
        item
        xs={12}
        sm={10}
        container
        justify="center"
        style={{ margin: "0 auto", border: "3px solid coral" }}
      >
        <Grid item xs={12}>
          <Typography
            align="center"
            variant="h2"
            className={classes.top_heading}
            component="h2"
          >
            Update <span>Password</span>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={10} md={6} className={classes.container}>
          <form align="center" onSubmit={handleSubmit}>
            <FormControl className={classes.input_box}>
              <InputLabel
                shrink
                htmlFor="oldpassword"
                className={classes.label}
              >
                Old Password
              </InputLabel>
              <CustomInput
                type="password"
                name="oldpassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </FormControl>
            <FormControl className={classes.input_box}>
              <InputLabel
                shrink
                htmlFor="newpassword"
                className={classes.label}
              >
                New Password
              </InputLabel>
              <CustomInput
                type="password"
                name="newpassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>
            <Button
              className={classes.box}
              color="secondary"
              variant="contained"
              type="submit"
              disabled={loading ? true : false}
            >
              Update Password
            </Button>
          </form>
        </Grid>
      </Grid>
      {error && <ToastAlert message={error} severity="error" />}
    </>
  );
};

export default UpdatePassword;
