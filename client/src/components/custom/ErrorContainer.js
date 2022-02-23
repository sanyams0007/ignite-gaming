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
      <img width="400px" height="400px" src="https://i.imgur.com/A040Lxr.png" />
      <Typography>Sorry this page is lost in space</Typography>
    </Box>
  );
};

export default ErrorContainer;
