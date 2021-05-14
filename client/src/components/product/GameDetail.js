import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "material-react-toastify";

import { getProductDetails, clearErrors } from "../../actions/productActions";
import { addItemToCart } from "../../actions/cartActions";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

// Components and Pages
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import Carousel from "../custom/Carousel";
import ReviewModal from "../custom/ReviewModal";
import ListReviews from "./ListReviews";

const GameDetail = () => {
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);

  const { id } = useParams();
  const dispatch = useDispatch();

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { user } = useSelector((state) => state.auth);
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );

  useEffect(() => {
    dispatch(getProductDetails(id));

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
      return;
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
      return;
    }

    if (success) {
      toast.success("Review added successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [toast, dispatch, reviewError, error, id, success]);

  const addToCart = () => {
    dispatch(addItemToCart(id, qty));
  };

  const increaseQty = () => {
    setQty((current) => (current >= product.stock ? current : current + 1));
  };
  const decreaseQty = () => {
    setQty((current) => (current <= 1 ? current : current - 1));
  };

  return (
    <>
      <MetaData title={product.name} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Grid
            item
            xs={12}
            sm={10}
            container
            spacing={2}
            style={{ margin: "0 auto", border: "3px solid blue" }}
          >
            <Grid item xs={12} lg={5} style={{ border: "3px solid green" }}>
              <Carousel images={product.images} alt={product.title} />
            </Grid>
            <Grid item xs={12} lg={7}>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="subtitle2" gutterBottom component="p">
                Product # {product._id}
              </Typography>
              <Divider />
              <Box display="flex" alignItems="center" pt={1} pb={2}>
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
              <Divider />
              <Typography variant="h6" gutterBottom>
                $ {product.price}
              </Typography>
              {product.stock > 0 && (
                <Box display="flex" alignItems="center">
                  <IconButton
                    onClick={decreaseQty}
                    disabled={qty <= 1 ? true : false}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    id="read-only-input"
                    value={qty}
                    type="number"
                    InputProps={{
                      readOnly: true,
                    }}
                    style={{ width: "40px" }}
                  />
                  <IconButton
                    onClick={increaseQty}
                    disabled={qty >= product.stock ? true : false}
                  >
                    <AddIcon />
                  </IconButton>
                  <Button
                    onClick={addToCart}
                    variant="contained"
                    color="primary"
                    aria-label="add to shopping cart"
                  >
                    <AddShoppingCartIcon /> Add to cart
                  </Button>
                </Box>
              )}

              <Typography component="p" paragraph>
                Status :
                <span>
                  {product.stock > 0
                    ? `In Stock  (${product.stock})`
                    : "Out Of Stock"}
                </span>
              </Typography>
              <Divider />
              <Typography variant="h6">Description</Typography>
              <Typography>
                Release Date: {product.release && product.release}
              </Typography>
              <Typography paragraph>{product.description}</Typography>

              <Typography component="p" paragraph>
                Sold By : <strong>{product.seller}</strong>
              </Typography>

              {user ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleModalOpen}
                >
                  Submit Your Review
                </Button>
              ) : (
                <Button variant="contained" color="primary">
                  <Link to="/login">Login to Submit Review</Link>
                </Button>
              )}

              <ReviewModal
                dispatch={dispatch}
                id={id}
                open={open}
                handleModalClose={handleModalClose}
              />
            </Grid>
            {product.reviews && product.reviews.length > 0 && (
              <Grid
                item
                xs={12}
                spacing={3}
                container
                style={{ margin: "50px auto 20px" }}
              >
                <ListReviews reviews={product.reviews} />
              </Grid>
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default GameDetail;
