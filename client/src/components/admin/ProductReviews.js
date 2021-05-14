import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "material-react-toastify";

import MetaData from "../layout/MetaData";
import ReviewsTable from "../custom/Table";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

import { useStyles } from "../cart/cartStyles";

import {
  getProductReviews,
  clearErrors,
  deleteReview,
} from "../../actions/productActions";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = () => {
  const [productId, setProductId] = useState("");

  const classes = useStyles();
  const dispatch = useDispatch();

  const { loading, error, reviews } = useSelector(
    (state) => state.productReviews
  );
  const { isDeleted } = useSelector((state) => state.review);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (productId !== "") {
      dispatch(getProductReviews(productId));
    }

    if (isDeleted) {
      toast.success("Review deleted successfully");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [toast, error, dispatch, productId, isDeleted]);

  const rows = [];

  reviews &&
    reviews.forEach((review) => {
      rows.push({
        ReviewID: review._id,
        Rating: review.rating,
        Comment: review.comment,
        User: review.name,
        Action: review._id,
      });
    });

  const columns = [
    { id: "ReviewID", label: "Review ID", minWidth: 150 },
    { id: "Rating", label: "Rating", minWidth: 40 },
    {
      id: "Comment",
      label: "Comment",
      minWidth: 150,
      align: "left",
    },
    {
      id: "User",
      label: "User",
      minWidth: 80,
      align: "right",
    },
    {
      id: "Action",
      label: "Actions",
      minWidth: 50,
      align: "right",
      format: (value) => (
        <>
          <IconButton
            aria-label="delete"
            onClick={() => deleteReviewHandler(value)}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </>
      ),
    },
  ];

  const deleteReviewHandler = (id) => {
    dispatch(deleteReview(id, productId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(getProductReviews(productId));
  };

  return (
    <>
      <MetaData title={"Product Reviews"} />

      <Grid
        item
        xs={12}
        alignContent="flex-start"
        container
        spacing={2}
        style={{ margin: "0 auto" }}
      >
        <Grid item xs={12}>
          <Typography
            align="center"
            variant="h2"
            component="h2"
            style={{ margin: "20px 0" }}
          >
            Product <span>Reviews</span>
          </Typography>
        </Grid>
        <Grid
          item
          spacing={2}
          xs={12}
          justify="center"
          container
          style={{ margin: "0 auto" }}
        >
          <Grid item xs={12} sm={8} md={4}>
            <TextField
              className={classes.root}
              required
              id="product_id"
              name="product_id"
              label="Enter Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              disabled={loading ? true : false}
              fullWidth
            >
              Search
            </Button>
          </Grid>
        </Grid>
        {reviews && reviews.length > 0 ? (
          <Grid item xs={12}>
            <ReviewsTable columns={columns} rows={rows} />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Typography
              align="center"
              variant="h6"
              component="h6"
              style={{ margin: "20px 0" }}
            >
              No Reviews
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default ProductReviews;
