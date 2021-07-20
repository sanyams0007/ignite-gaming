import { Grid, Divider, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const ListReviews = ({ reviews }) => {
  return (
    <>
      {reviews.map((review) => (
        <Grid item xs={12} md={8} key={review._id}>
          <Divider style={{ margin: "12px 0" }} />
          <Rating
            name="half-rating-read"
            value={review.rating}
            precision={0.5}
            readOnly
          />
          <Typography gutterBottom>by {review.name}</Typography>
          <Typography>{review.comment}</Typography>
        </Grid>
      ))}
    </>
  );
};

export default ListReviews;
