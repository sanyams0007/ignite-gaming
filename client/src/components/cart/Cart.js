import { useSelector } from "react-redux";

import MetaData from "../layout/MetaData";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <>
      <MetaData title="Your Cart" />
      {cartItems.length === 0 ? (
        <Grid item xs={12}>
          <Typography align="center" variant="h2" component="h2">
            Your Cart is Empty
          </Typography>
        </Grid>
      ) : (
        <Grid
          item
          xs={12}
          sm={10}
          container
          alignContent="flex-start"
          alignItems="flex-start"
          style={{ margin: "0 auto", border: "3px solid coral" }}
        >
          <Grid item xs={12}>
            <Typography
              align="center"
              variant="h2"
              component="h2"
              style={{ margin: "20px 0" }}
            >
              Your Cart : <span>{cartItems.length} item</span>
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            container
            style={{ border: "3px solid green" }}
          >
            {cartItems.map((item) => (
              <>
                <CartItem item={item} />
              </>
            ))}
          </Grid>
          <Grid xs={12} sm={5} item style={{ border: "3px solid yellow" }}>
            <CartSummary />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Cart;
