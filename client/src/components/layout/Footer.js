import { Box, Typography, Divider } from "@material-ui/core";

const Footer = () => {
  return (
    <>
      <Divider />
      <Box textAlign="center" py={2} min-height="10%">
        <Typography variant="body1" component="p">
          Ignite Gaming -&copy; 2020-2021, All Rights Reserved
        </Typography>
      </Box>
    </>
  );
};

export default Footer;
