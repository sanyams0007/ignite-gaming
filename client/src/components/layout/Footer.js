import { Box, Typography, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";

const Footer = () => {
  const Copyright = () => {
    return (
      <Typography variant="body1" align="center">
        {"Copyright © "}
        <Link to="/">Ignite Gaming</Link> {new Date().getFullYear()}
        {", All Rights Reserved."}
      </Typography>
    );
  };
  return (
    <>
      <Divider />
      <Box py={2} min-height="10%">
        <Copyright />
      </Box>
    </>
  );
};

export default Footer;
