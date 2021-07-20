import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "material-react-toastify";

import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import {
  updateProfile,
  loadUser,
  clearErrors,
} from "../../actions/userActions";

import MetaData from "../layout/MetaData";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import {
  updateProfileStyles,
  CustomInput,
  commonStyles,
  containerStyles,
} from "./userStyle";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const classes = updateProfileStyles();
  const common = commonStyles();
  const containerStyle = containerStyles();
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
      toast.error(error);
      dispatch(clearErrors());
      return;
    }

    if (isUpdated) {
      toast.success("Profile update successfull");
      dispatch(loadUser());

      history.push("/me");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, user, error, isUpdated, history]);

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
        style={{ margin: "0 auto" }}
      >
        <Grid item xs={12}>
          <Typography
            align="center"
            variant="h2"
            className={common.top_heading}
            component="h2"
          >
            Update <span>Profile</span>
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} className={classes.container}>
          <Avatar
            alt="Avatar Preview"
            src={avatarPreview}
            className={classes.avatar}
          />

          <Button
            className={containerStyle.button}
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
            <FormControl
              className={common.input_box}
              style={{ marginBottom: "25px" }}
            >
              <InputLabel shrink htmlFor="name" className={common.label}>
                Full Name
              </InputLabel>
              <CustomInput
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl
              className={common.input_box}
              style={{ marginBottom: "25px" }}
            >
              <InputLabel shrink htmlFor="email" className={common.label}>
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
              className={containerStyle.button}
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
    </>
  );
};

export default UpdateProfile;
