import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import ViewListIcon from "@material-ui/icons/ViewList";
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
  avatar: {
    cursor: "pointer",
  },
  paper: {
    "& .MuiPopover-paper": {
      top: "65px!important",
      backgroundColor: "#fff",
      boxShadow: "0px 0px 5px 2px rgba(221,34,204,0.6)",
    },
    "& .MuiMenuItem-root": {
      minHeight: "48px",
    },
  },
  text_color: {
    color: "#000!important",
    display: "flex",
    alignItems: "center",
  },
}));

export default function UserMenu({ user, logout, cartItems }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "user-menu";

  return (
    <>
      <Avatar
        alt={user && user.name}
        src={user.avatar && user.avatar.url}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleMenuOpen}
        className={classes.avatar}
      />
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        className={classes.paper}
      >
        <MenuItem onClick={handleMenuClose}>
          <Link to="/me" className={classes.text_color}>
            <PersonIcon /> <span style={{ marginLeft: "10px" }}>Profile</span>
          </Link>
        </MenuItem>
        {user && user.role === "admin" && (
          <MenuItem onClick={handleMenuClose}>
            <Link to="/dashboard" className={classes.text_color}>
              <DashboardIcon />
              <span style={{ marginLeft: "10px" }}>Dashboard</span>
            </Link>
          </MenuItem>
        )}
        <MenuItem onClick={handleMenuClose}>
          <Link to="/cart" className={classes.text_color}>
            <Badge badgeContent={cartItems} color="secondary">
              <ShoppingCart />
            </Badge>
            <span style={{ marginLeft: "10px" }}>Cart</span>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/orders/me" className={classes.text_color}>
            <ViewListIcon /> <span style={{ marginLeft: "10px" }}>Orders</span>
          </Link>
        </MenuItem>

        <MenuItem onClick={handleMenuClose}>
          <Link to="/" className={classes.text_color} onClick={logout}>
            <ExitToAppIcon /> <span style={{ marginLeft: "10px" }}>Logout</span>
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
}
