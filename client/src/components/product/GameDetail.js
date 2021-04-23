import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productActions";

// Icons
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

// Components and Pages
import ToastAlert from "../layout/ToastAlert";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import {
  Grid,
  Typography,
  Box,
  Button,
  TextField,
  Divider,
} from "@material-ui/core";
import ImageCarousel from "../ImageCarousel";
import ReviewModal from "../ReviewModal";

const GameDetail = () => {
  const [open, setOpen] = useState(false);

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

  useEffect(() => {
    dispatch(getProductDetails(id));

    if (error) return;
  }, [dispatch, error, id]);
  return (
    <>
      <MetaData title={product.name} />
      {loading ? (
        <Loader />
      ) : error ? (
        <ToastAlert message={error} severity="error" />
      ) : (
        <>
          <Grid item xs={false} sm={1}></Grid>
          <Grid
            item
            xs={12}
            sm={10}
            container
            spacing={2}
            style={{ margin: "0", border: "3px solid blue" }}
          >
            <Grid item xs={12} lg={5} style={{ border: "3px solid green" }}>
              <ImageCarousel images={product.images} alt={product.title} />
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
                ${product.price}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
              >
                <span>
                  <RemoveIcon />
                </span>
                <TextField
                  id="read-only-input"
                  defaultValue={1}
                  type="number"
                  InputProps={{
                    readOnly: true,
                  }}
                  style={{ width: "40px" }}
                />
                <span>
                  <AddIcon />
                </span>
                <Button variant="contained" color="primary">
                  <AddShoppingCartIcon /> Add to cart
                </Button>
              </Box>
              <Typography component="p" paragraph>
                Status :
                <span> {product.stock > 0 ? "In Stock" : "Out Of Stock"}</span>
              </Typography>
              <Divider />
              <Typography variant="h6">Description</Typography>
              <Typography>Release Date: 22/2/2021</Typography>
              <Typography paragraph>{product.description}</Typography>

              <Typography component="p" paragraph>
                Sold By : <strong>{product.seller}</strong>
              </Typography>

              <Button
                variant="contained"
                color="primary"
                onClick={handleModalOpen}
              >
                Submit Your Review
              </Button>
              <ReviewModal open={open} handleModalClose={handleModalClose} />
            </Grid>
          </Grid>
          <Grid item xs={false} sm={1}></Grid>
          {error && <ToastAlert message={error} severity="error" />}
        </>
      )}
    </>
  );
};

export default GameDetail;
