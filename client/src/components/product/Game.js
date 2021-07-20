import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { addItemToCart } from "../../actions/cartActions";

import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

const useStyle = makeStyles({
  card: {
    minHeight: "100%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  },
  media: {
    height: "300px",
    minHeight: "100%",
    maxWidth: "230px",
    width: "100%",
    margin: "0 auto",
    objectFit: "cover",
  },
  content: {
    padding: "10px",
  },
  action: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: "auto",
  },
});

const Game = ({ product }) => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItemToCart(product._id, 1));
  };

  return (
    <Card className={classes.card} elevation={0}>
      <CardMedia
        className={classes.media}
        image={product.images[0].url}
        component="img"
        alt={product.name}
      />

      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h6" component="h2">
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          borderColor="transparent"
          justifyContent="center"
        >
          <Rating
            defaultValue={0.0}
            precision={0.5}
            name="read-only"
            value={product.ratings}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
            readOnly
          />
          <Typography
            variant="subtitle1"
            component="span"
          >{` (${product.numOfReviews} Reviews)`}</Typography>
        </Box>
        {/*  <Typography variant="h6" component="p">
          <span style={{ color: "#ff4747" }}>$ </span>
          {product.price}
        </Typography> */}
      </CardContent>
      <div className={classes.action}>
        <Typography variant="h6" component="p">
          <span style={{ color: "#ff4747" }}>$ </span>
          {product.price}
        </Typography>
        {product.stock >= 1 && (
          <Button
            onClick={addToCart}
            variant="contained"
            color="primary"
            aria-label="add to shopping cart"
          >
            <AddShoppingCartIcon />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default Game;
