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
    "&:first-child": {
      margin: "8px 0",
    },
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
    "&:hover": {
      textDecoration: "underline",
    },
  },
  demoBox: {
    borderTop: "1px solid rgba(255,255,255,.5)",
  },
}));

export const marginStyles = makeStyles((theme) => ({
  box: {
    margin: "20px 10px",
  },
}));

export const profileStyles = makeStyles({
  top_heading: {
    margin: "25px auto",
  },
  container: {
    padding: "50px 25px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  avatar: {
    width: "250px",
    height: "250px",
  },
  box: {
    margin: "20px 10px",
  },
});

export const updateProfileStyles = makeStyles({
  container: {
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
});
