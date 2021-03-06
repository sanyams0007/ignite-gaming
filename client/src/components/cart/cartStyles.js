import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    "& .MuiInputBase-input": {
      color: "#dd22cc",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid #fff",
    },
    "& .MuiSvgIcon-root": {
      fill: "#fff",
    },
  },
  img: {
    margin: "15px 10px 0 0",
    maxWidth: "60px",
    maxHeight: "55px",
    objectFit: "contain",
  },
}));

export const cartItemStyle = makeStyles({
  container: {
    borderRadius: "0 4px 4px 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "rgba(255,255,255,.12)",
    paddingBottom: "7px",
  },
  media: {
    borderRadius: " 4px 0 0 4px",
    backgroundColor: "rgba(255,255,255,.12)",
    objectFit: "cover",
    minWidth: "120px",
    width: "100%",
    minHeight: "100%",
    maxHeight: "180px",
    aspectRatio: "16 / 9",
    objectPosition: "center",
  },
  line: {
    alignSelf: "normal",
    margin: "7px",
  },
});

export const checkoutStyle = makeStyles((theme) => ({
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export const OrderSuccessStyle = makeStyles((theme) => ({
  top_heading: {
    margin: "25px auto",
  },
  container: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    fontSize: "12rem",
    fill: "#83e85a",
  },
  message: {
    margin: "20px 0",
    textAlign: "center",
  },
  link: {
    color: "#007bff!important",
    textDecoration: "underline!important",
  },
}));
