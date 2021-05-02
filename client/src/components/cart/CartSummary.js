import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { useSelector } from "react-redux";
import { Divider } from "@material-ui/core";

export default function CartSummary() {
  const history = useHistory();

  const { cartItems } = useSelector((state) => state.cart);

  const handleCheckout = () => {
    history.push("/login?redirect=checkout");
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Order Summary
      </Typography>

      <Divider />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={1}
      >
        <Typography variant="h6" component="p">
          Total Items:
        </Typography>
        <Typography variant="h6" component="span">
          {cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)} (
          Units )
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        my={1}
      >
        <Typography variant="h6" component="p">
          Est. Total:
        </Typography>
        <Typography variant="h6" component="span">
          ${" "}
          {Number(
            cartItems.reduce(
              (acc, item) => acc + Number(item.quantity) * Number(item.price),
              0
            )
          ).toFixed(2)}
        </Typography>
      </Box>
      <Divider />

      <Box display="flex" justifyContent="center" my={2}>
        <Button variant="contained" color="secondary" onClick={handleCheckout}>
          Checkout
        </Button>
      </Box>
    </Box>
  );
}
