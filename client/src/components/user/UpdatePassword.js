import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "material-react-toastify";

import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { updatePassword, clearErrors } from "../../actions/userActions";

import MetaData from "../layout/MetaData";

import { Grid, Typography, Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import { CustomInput, commonStyles, containerStyles } from "./userStyle";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const classes = commonStyles();
  const containerStyle = containerStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { isUpdated, error, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
      return;
    }

    if (isUpdated) {
      toast.success("Password update successfull");
      history.push("/me");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [toast, dispatch, error, isUpdated, history]);

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
            Update <span>Password</span>
          </Typography>
        </Grid>
        <Grid item xs={12} className={containerStyle.container}>
          <FormControl className={classes.input_box}>
            <InputLabel shrink htmlFor="oldpassword" className={classes.label}>
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
            <InputLabel shrink htmlFor="newpassword" className={classes.label}>
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
            className={containerStyle.button}
            color="primary"
            variant="contained"
            type="submit"
            onClick={handleSubmit}
            disabled={loading ? true : false}
          >
            Update Password
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default UpdatePassword;
