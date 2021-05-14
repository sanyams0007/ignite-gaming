import { withStyles, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

export const CustomInput = withStyles((theme) => ({
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

export const commonStyles = makeStyles((theme) => ({
  top_heading: {
    margin: "25px auto",
  },
  input_box: {
    width: "100%",
    margin: "20px 0 5px",
  },

  label: {
    fontSize: 23,
  },
}));

export const containerStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 10,
    padding: "10% 10% 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "60%",
  },
  button: {
    minWidth: "40%",
    fontSize: 18,
    padding: "5px 30px!important",
    margin: "20px 0",
  },
}));

export const signInOutStyles = makeStyles((theme) => ({
  line: {
    alignSelf: "normal",
  },
  link_text: {
    margin: "20px 0 10px",
    fontSize: 18,
  },
  link: {
    fontSize: 18,
  },
}));

export const marginStyles = makeStyles((theme) => ({
  box: {
    margin: "20px 10px",
  },
}));

//css to look for
// cartItem
//checkout
// ordersuccess
//payment
//shipping
//orderTable

//Game
