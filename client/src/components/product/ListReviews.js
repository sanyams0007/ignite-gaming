import { Grid, Divider, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const ListReviews = ({ reviews }) => {
  return (
    <>
      <Divider style={{ width: "100%" }} />
      {reviews.map((review) => (
        <>
          <Grid item xs={12} md={8}>
            <Rating
              name="half-rating-read"
              value={review.rating}
              precision={0.5}
              readOnly
            />
            <Typography gutterBottom>by {review.name}</Typography>
            <Typography>{review.comment}</Typography>
          </Grid>
          <Divider style={{ width: "100%" }} />
        </>
      ))}
    </>
  );
};

export default ListReviews;
