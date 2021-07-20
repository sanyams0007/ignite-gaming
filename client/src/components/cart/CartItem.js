import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { cartItemStyle } from "./cartStyles";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const classes = cartItemStyle();

  const removeFromCart = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const increaseQty = (id, qty, stock) => {
    const newQty = qty + 1;

    if (newQty > stock) return;

    dispatch(addItemToCart(id, newQty));
  };

  const decreaseQty = (id, qty) => {
    const newQty = qty - 1;

    if (newQty <= 0) return;

    dispatch(addItemToCart(id, newQty));
  };

  return (
    <Grid container style={{ margin: "0 0 15px 0" }}>
      <Grid item xs={4} sm={5} md={4} lg={3}>
        <img className={classes.media} alt={item.product} src={item.image} />
      </Grid>
      <Grid className={classes.container} item xs={8} sm={7}>
        <Typography gutterBottom>
          <Link to={`/products/${item.product}`}>{item.name}</Link>
        </Typography>
        <Typography variant="h6" gutterBottom>
          ${item.price}
        </Typography>
        <Divider className={classes.line} />

        <Box display="flex" alignItems="center">
          <IconButton
            onClick={() => decreaseQty(item.product, item.quantity)}
            disabled={item.quantity <= 1 ? true : false}
          >
            <RemoveIcon />
          </IconButton>
          <TextField
            id="read-only-input"
            value={item.quantity}
            type="number"
            InputProps={{
              readOnly: true,
            }}
            style={{ width: "40px" }}
          />
          <IconButton
            onClick={() => increaseQty(item.product, item.quantity, item.stock)}
            disabled={item.quantity >= item.stock ? true : false}
          >
            <AddIcon />
          </IconButton>
        </Box>
        <Divider className={classes.line} />
        <Button
          onClick={() => removeFromCart(item.product)}
          variant="contained"
          color="primary"
          aria-label="remove from shopping cart"
        >
          Remove
        </Button>
      </Grid>
    </Grid>
  );
};

export default CartItem;
