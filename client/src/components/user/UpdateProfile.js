import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { Grid, Typography, Button } from "@material-ui/core";
import { updateProfile, loadUser } from "../../actions/userActions";
import ToastAlert from "../layout/ToastAlert";
import MetaData from "../layout/MetaData";
import Avatar from "@material-ui/core/Avatar";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

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
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: "250px",
    height: "250px",
  },
  box: {
    margin: "20px 10px",
  },
  button: {
    borderRadius: 10,
  },
  input_box: {
    width: "100%",
    margin: "25px 0",
  },
  label: {
    fontSize: 23,
  },
});

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector((state) => state.auth);
  const { isUpdated, error, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(
        typeof user.avatar === "undefined" ? "" : user.avatar.url
      );
    }

    if (error) {
      return;
    }

    if (isUpdated) {
      dispatch(loadUser());

      history.push("/me");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, isUpdated, history]);

  const handleChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    if (avatarPreview || avatar) formData.set("avatar", avatarPreview);

    dispatch(updateProfile(formData));
  };
  return (
    <>
      <MetaData title="Update Profile" />
      <Grid
        item
        xs={12}
        sm={10}
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
            Update <span>Profile</span>
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          className={classes.container}
          alignItems="center"
        >
          <Avatar
            alt="Avatar Preview"
            src={avatarPreview}
            className={classes.avatar}
          />

          <Button
            className={classes.box}
            color="secondary"
            component="label"
            variant="contained"
          >
            Upload Pic
            <input
              type="file"
              name="avatar"
              hidden
              accept="image/*"
              onChange={handleChange}
            />
          </Button>
        </Grid>
        <Grid item xs={12} md={6} className={classes.container}>
          <form align="center" encType="multipart/form-data">
            <FormControl className={classes.input_box}>
              <InputLabel shrink htmlFor="name" className={classes.label}>
                Full Name
              </InputLabel>
              <CustomInput
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl className={classes.input_box}>
              <InputLabel shrink htmlFor="email" className={classes.label}>
                Email
              </InputLabel>
              <CustomInput
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <Button
              onClick={handleSubmit}
              className={classes.box}
              color="secondary"
              variant="contained"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </Grid>
      </Grid>
      {error && <ToastAlert message={error} severity="error" />}
    </>
  );
};

export default UpdateProfile;
