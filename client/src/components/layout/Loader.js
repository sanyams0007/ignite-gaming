import Spinner from "react-spinkit";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";
const Loader = () => {
  return (
    <Grid item xs={12} style={{ height: "100%" }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Spinner color="white" name="ball-triangle-path" />
      </Box>
    </Grid>
  );
};

export default Loader;
