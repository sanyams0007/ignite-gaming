import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "material-react-toastify";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import UsersTable from "../custom/Table";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { allUsers, deleteUser, clearErrors } from "../../actions/userActions";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = ({ history, match }) => {
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(allUsers());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("User deleted successfully");
      history.push(match.path);
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [match.path, error, dispatch, isDeleted, history]);

  const rows = [];

  users &&
    users.forEach((user) => {
      rows.push({
        ID: user._id,
        Name: user.name,
        Email: user.email,
        Role: user.role,
        Actions: user._id,
      });
    });

  const columns = [
    { id: "ID", label: "User ID", minWidth: 150 },
    { id: "Name", label: "Name", minWidth: 100 },
    {
      id: "Email",
      label: "Email",
      minWidth: 100,
      align: "left",
    },
    {
      id: "Role",
      label: "Role",
      minWidth: 100,
      align: "right",
    },
    {
      id: "Actions",
      label: "Actions",
      minWidth: 130,
      align: "right",
      format: (value) => (
        <>
          <IconButton aria-label="edit">
            <Link to={`user/${value}`}>
              <EditIcon color="primary" />
            </Link>
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => deleteUserHandler(value)}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </>
      ),
    },
  ];

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <>
      <MetaData title={"All Users"} />
      {loading ? (
        <Loader />
      ) : (
        <Grid
          item
          xs={12}
          alignContent="flex-start"
          container
          spacing={2}
          style={{ margin: "0 auto", overflow: "auto" }}
        >
          <Grid item xs={12}>
            <Typography
              align="center"
              variant="h2"
              component="h2"
              style={{ margin: "20px 0" }}
            >
              All <span>Users</span>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <UsersTable columns={columns} rows={rows} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default UsersList;
