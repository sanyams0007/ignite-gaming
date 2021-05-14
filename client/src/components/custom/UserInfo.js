import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import ViewListIcon from "@material-ui/icons/ViewList";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    color: "#000",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 5px 2px rgba(221,34,204,0.6)",
  },
  /* image: {
    height: "50px",
    width: "50px",
    border: "1px solid",
    borderRadius: "100px",
    background: "#f3f3f3",
  }, */
  text_color: {
    color: "#000!important",
  },
  sectionMobile: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },
}));

export default function UserInfo({ user, logout }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <Avatar
        alt={user && user.name}
        src={user.avatar && user.avatar.url}
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      />
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        anchor
        role={undefined}
        transition
        disablePortal
        style={{ zIndex: 5 }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper className={classes.paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleClose}>
                    <Link to="/me" className={classes.text_color}>
                      <PersonIcon /> Profile
                    </Link>
                  </MenuItem>
                  {user && user.role === "admin" && (
                    <MenuItem onClick={handleClose}>
                      <Link to="/dashboard" className={classes.text_color}>
                        <DashboardIcon /> Dashboard
                      </Link>
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={handleClose}
                    className={classes.sectionMobile}
                  >
                    <Link to="/cart" className={classes.text_color}>
                      <ShoppingCart /> Cart
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/orders/me" className={classes.text_color}>
                      <ViewListIcon /> Orders
                    </Link>
                  </MenuItem>

                  <MenuItem
                    onClick={handleClose}
                    className={classes.text_color}
                  >
                    <Link
                      to="/"
                      className={classes.text_color}
                      onClick={logout}
                    >
                      <ExitToAppIcon /> Logout
                    </Link>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
