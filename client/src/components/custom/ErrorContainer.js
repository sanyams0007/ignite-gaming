import { Box, Typography } from "@material-ui/core";

const ErrorContainer = () => {
  return (
    <Box
      pt="50px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
    >
      <img
        alt="error 404"
        style={{ objectFit: "contain" }}
        width="100%"
        height="400px"
        src="https://i.imgur.com/A040Lxr.png"
      />
      <Typography>Sorry this page is lost in space</Typography>
    </Box>
  );
};

export default ErrorContainer;
