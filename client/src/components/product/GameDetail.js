import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "material-react-toastify";
import axios from "axios";

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
import ImageCarousel from "../custom/ImageCarousel";
import ReviewModal from "../custom/ReviewModal";
import ListReviews from "./ListReviews";
import Game from "./Game";

const GameDetail = () => {
  const [open, setOpen] = useState(false);
  const [qty, setQty] = useState(1);
  const [products, setProducts] = useState([]);

  const { id } = useParams();
  const dispatch = useDispatch();

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const addToCart = () => {
    dispatch(addItemToCart(id, qty));
  };

  const increaseQty = () => {
    setQty((current) => (current >= product.stock ? current : current + 1));
  };

  const decreaseQty = () => {
    setQty((current) => (current <= 1 ? current : current - 1));
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
  }, [dispatch, reviewError, error, success, id]);

  useEffect(() => {
    const getRecommendedProducts = async () => {
      const link = `/api/products?keyword=&page=1&price[lte]=500&price[gte]=1&category=${product?.category}&ratings[gte]=0&resCount=20`;
      try {
        let res;
        if (product?.category) {
          res = await axios.get(link);
          setProducts(res.data.products);
        }
      } catch ({ response }) {
        console.log(response);
      }
    };
    getRecommendedProducts();
  }, [product]);

  if (!product) return null;

  const recommendedProducts = products
    .filter(({ _id }) => _id !== product._id)
    .slice(0, 4);

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
            style={{ margin: "0 auto" }}
          >
            <Grid item xs={12} lg={5}>
              {product.images && <ImageCarousel images={product.images} />}
            </Grid>
            <Grid item xs={12} lg={7}>
              <Typography
                color="secondary"
                variant="h3"
                component="h2"
                gutterBottom
              >
                {product.name}
              </Typography>
              <Typography variant="h6" gutterBottom component="h2">
                Product # {product._id}
              </Typography>
              <Divider style={{ margin: "20px 0" }} />
              <Box display="flex" alignItems="center">
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
              <Divider style={{ margin: "20px 0" }} />
              <Typography variant="h6" gutterBottom>
                <span style={{ color: "#ff4747" }}>$ </span>
                {product.price}
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

              <Typography variant="body1" component="p">
                Status :
                <span style={{ color: product.stock > 0 ? "green" : "red" }}>
                  {product.stock > 0
                    ? ` In Stock (${product.stock})`
                    : " Out Of Stock"}
                </span>
              </Typography>
              <Divider style={{ margin: "20px 0" }} />
              <Typography variant="h6">Description</Typography>
              <Typography variant="body1" gutterBottom>
                Release Date: {product.release && product.release}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Genre : {product.category && product.category}
              </Typography>
              <Typography paragraph variant="body1" component="p" gutterBottom>
                {product.description}
              </Typography>

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
                  <Link to={`/login`}>Login to Submit Review</Link>
                </Button>
              )}

              <ReviewModal
                dispatch={dispatch}
                id={id}
                open={open}
                handleModalClose={handleModalClose}
              />
            </Grid>

            {recommendedProducts.length > 0 && (
              <Grid
                item
                xs={12}
                container
                alignContent="flex-start"
                spacing={3}
                style={{ margin: "0 auto" }}
              >
                <Grid item xs={12}>
                  <Typography gutterBottom variant="h6">
                    You might also like:
                  </Typography>
                  <Divider />
                </Grid>
                {recommendedProducts.map((product) => (
                  <Grid key={product._id} item xs={12} sm={6} md={4} lg={3}>
                    <Game product={product} />
                  </Grid>
                ))}
              </Grid>
            )}

            {product.reviews && product.reviews.length > 0 && (
              <Grid
                item
                xs={12}
                spacing={3}
                container
                style={{ margin: "50px auto 20px" }}
              >
                <Grid item xs={12}>
                  <Typography gutterBottom variant="h6">
                    Reviews:
                  </Typography>
                </Grid>
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
