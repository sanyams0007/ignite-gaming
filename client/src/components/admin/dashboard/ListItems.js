import { useState } from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ListAltIcon from "@material-ui/icons/ListAlt";
import GradeIcon from "@material-ui/icons/Grade";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LibraryBooksSharpIcon from "@material-ui/icons/LibraryBooksSharp";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const ListItems = ({ drawerOpen, path }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  if (drawerOpen === false && open === true) {
    handleClick();
  }
  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      <Link to="/dashboard">
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <LibraryBooksSharpIcon />
        </ListItemIcon>
        <ListItemText primary="Products" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to={`${path}/admin/products`}>
            <ListItem button style={{ paddingLeft: "40px" }}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="All" />
            </ListItem>
          </Link>
          <Link to="/admin/product">
            <ListItem button style={{ paddingLeft: "40px" }}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add" />
            </ListItem>
          </Link>
        </List>
      </Collapse>
      <Link to="/admin/orders">
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
      </Link>
      <Link to="/admin/users">
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      </Link>
      <Link to="/admin/reviews">
        <ListItem button>
          <ListItemIcon>
            <GradeIcon />
          </ListItemIcon>
          <ListItemText primary="Reviews" />
        </ListItem>
      </Link>
      <Link to="/dashboard/random">
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
      </Link>
    </List>
  );
};

export default ListItems;
