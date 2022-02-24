import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  footer: {
    borderTop: "1px solid rgba(255,255,255,.12)",
    minHeight: "10%",
    padding: "16px 0",
    width: "100%",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography variant="body1" align="center">
        {"Copyright © "}
        <Link to="/">Ignite Gaming</Link> {new Date().getFullYear()}
        {", All Rights Reserved."}
      </Typography>
    </footer>
  );
};

export default Footer;
