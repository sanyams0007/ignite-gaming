import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "material-react-toastify";

import { useStyles } from "../cart/cartStyles";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import {
  updateUser,
  getUserDetails,
  clearErrors,
} from "../../actions/userActions";

import MetaData from "../layout/MetaData";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

const UpdateUser = ({ history, match }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();
  const classes = useStyles();

  const { loading, error, isUpdated } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.userDetails);

  const userId = match.params.id;
  const roles = ["admin", "user"];

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
      return;
    }

    if (isUpdated) {
      toast.success("User updated successfully");
      history.push("/dashboard/admin/users");
      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, error, isUpdated, history, userId, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("role", role);

    dispatch(updateUser(user._id, formData));
  };

  return (
    <>
      <MetaData title={"Update User"} />
      <Grid
        item
        spacing={2}
        xs={12}
        sm={10}
        lg={8}
        alignContent="flex-start"
        container
        style={{ margin: "0 auto" }}
      >
        <Grid item xs={12}>
          <Typography
            align="center"
            variant="h2"
            component="h2"
            style={{ margin: "20px 0" }}
          >
            Update <span>User</span>
          </Typography>
        </Grid>
        <Grid
          item
          spacing={6}
          xs={12}
          md={8}
          justify="center"
          container
          style={{ margin: "0 auto" }}
        >
          <Grid item xs={12}>
            <TextField
              className={classes.root}
              required
              id="name"
              name="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.root}
              type="email"
              required
              id="email"
              name="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              className={classes.root}
              required
              select
              id="role"
              name="role"
              fullWidth
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              disabled={loading ? true : false}
              fullWidth
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default UpdateUser;
