import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "material-react-toastify";
import useAlan from "../hooks/useAlan";

import { logout } from "../../actions/userActions";
import UserMenu from "../custom/UserMenu";
import Logo from "../../svgs/Logo";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  appbar: {
    borderBottom: "1px solid rgba(255,255,255,.12)",
  },
  toolbar: {
    padding: "15px 7.5%",
    [theme.breakpoints.down("sm")]: {
      padding: "15px",
    },
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    display: "block",
    fontWeight: "bold",
    marginLeft: "15px",
    fontSize: "2.5rem",
  },
  search: {
    position: "relative",
    background: "linear-gradient(145deg, #72f, #c1b)",
    borderRadius: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    padding: "5px",
    width: "65%",
    [theme.breakpoints.up("sm")]: {
      width: "35%",
      margin: "0 25px 0 auto",
    },
    [theme.breakpoints.up("md")]: {
      width: "25%",
      margin: "0 10px 0 auto",
    },
  },
  searchIcon: {
    minWidth: "14%",
    padding: 0,
    borderRadius: "0 25px 25px 0",
    backgroundColor: "rgba(255, 255, 255, 0.33)",
    "& .MuiSvgIcon-root": {
      padding: "3px",
      fontSize: "32px",
    },
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.33)",
    },
  },
  inputRoot: {
    width: "86%",
    backgroundColor: " rgba(255, 255, 255, 0.33)",
    border: "none",
    outline: "none",
    borderRadius: "25px 0 0 25px",
    marginRight: "5px",
    "& ::placeholder": {
      color: "#fff",
      opacity: "1",
    },
    "& .MuiInputBase-input": {
      color: "#fff",
      textIndent: "10px",
    },
  },
  action: {
    fontWeight: "bold",
  },
  text_color: {
    color: "#000!important",
    display: "flex",
    alignItems: "center",
  },
  paper: {
    "& .MuiPopover-paper": {
      top: "60px!important",
      backgroundColor: "#fff",
      boxShadow: "0px 0px 5px 2px rgba(221,34,204,0.6)",
    },
    "& .MuiMenuItem-root": {
      minHeight: "48px",
    },
  },
}));

const Header = () => {
  useAlan();
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [keyword, setKeyword] = useState("");
  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfull");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  //const callSearch = debounce();

  // working debounce method
  /* function debounce() {
    let timer;
    return () => {
      if (!timer) {
        const val = document.getElementById("search").value;
        //console.log("here", val);
        history.push(`/search/${val}`);
      }
      //console.log(timer);
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = undefined;
      }, 1000);
    };
  } */

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "mobile-menu";
  const MobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      className={classes.paper}
    >
      <MenuItem onClick={handleMobileMenuClose}>
        <Link to="/login" className={classes.text_color}>
          <AccountCircle /> <span style={{ marginLeft: "10px" }}>Login</span>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMobileMenuClose}>
        <Link to="/cart" className={classes.text_color}>
          <Badge badgeContent={cartItems.length} color="secondary">
            <ShoppingCart /> <span style={{ marginLeft: "10px" }}>Cart</span>
          </Badge>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        className={classes.appbar}
      >
        <Toolbar className={classes.toolbar}>
          <Link to="/">
            <div className={classes.logoContainer}>
              <Logo />
              <Hidden xsDown>
                <Typography className={classes.title} variant="h4" noWrap>
                  Ignite Gaming
                </Typography>
              </Hidden>
            </div>
          </Link>

          <div className={classes.search}>
            <InputBase
              id="search"
              //onKeyUp={handleChange}
              onChange={handleChange}
              //onChange={callSearch}
              value={keyword}
              placeholder="Search…"
              className={classes.inputRoot}
              inputProps={{ "aria-label": "search" }}
            />
            <Button onClick={handleSearch} className={classes.searchIcon}>
              <SearchIcon />
            </Button>
          </div>

          <Hidden smDown>
            <Link to="/cart">
              <IconButton aria-label="cart items" color="inherit">
                <Badge badgeContent={cartItems.length} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Link>
          </Hidden>

          {user ? (
            <UserMenu
              user={user}
              logout={handleLogout}
              cartItems={cartItems.length}
            />
          ) : (
            !loading && (
              <>
                <Hidden smDown>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.action}
                  >
                    <Link to="/login">Sign In</Link>
                  </Button>
                </Hidden>
                <Hidden mdUp>
                  <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                    style={{ margin: 0 }}
                  >
                    <MoreIcon />
                  </IconButton>
                </Hidden>
              </>
            )
          )}
        </Toolbar>
      </AppBar>
      {MobileMenu}
    </>
  );
};

export default Header;
