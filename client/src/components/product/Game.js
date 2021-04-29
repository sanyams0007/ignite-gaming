import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Link } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";

const useStyle = makeStyles({
  card: {
    minHeight: "100%",
    minWidth: "33%",
    border: "1px solid coral",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  },
  media: {
    maxHeight: "300px",
    maxWidth: "230px",
    margin: "0 auto",
    objectFit: "contain",
  },
  content: {
    padding: "10px",
    marginTop: "auto",
  },
});

const Game = ({ product }) => {
  const classes = useStyle();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={product.images[0].url}
        component="img"
        alt={product.name}
      />
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h6" component="h2">
          <Link to={`/product/${product._id}`}> {product.name}</Link>
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
        <Typography variant="h6" component="p">
          <span style={{ color: "#ff4747" }}>$ </span>
          {product.price}
        </Typography>
      </CardContent>
      {/* <CardActions className={classes.action}>
        <Button color="primary" variant="contained">
          <Link to={`/product/${product._id}`}>Detail</Link>
        </Button>
        <Button color="primary" variant="contained">
          <AddShoppingCartIcon />
        </Button>
      </CardActions> */}
    </Card>
  );
};

export default Game;
