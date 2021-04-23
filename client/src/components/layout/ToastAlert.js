import React, { useState } from "react";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { clearErrors } from "../../actions/userActions";
import { useDispatch } from "react-redux";

const ToastAlert = ({ message, severity }) => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  setTimeout(() => {
    dispatch(clearErrors());
  }, 5000);

  return (
    <Snackbar open={open} onClose={handleClose}>
      <Alert variant="filled" onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastAlert;
