import Spinner from "react-spinkit";
import Box from "@material-ui/core/Box";
const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="100%"
    >
      {/* <h3 style={{ paddingBottom: "50px" }}>Loading...</h3> */}
      <Spinner name="ball-triangle-path" />
    </Box>
  );
};

export default Loader;
