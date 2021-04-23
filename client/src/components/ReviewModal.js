import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CloseIcon from "@material-ui/icons/Close";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import {
  Button,
  Grid,
  TextareaAutosize,
  Typography,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#9922ee",
    border: "2px solid #000",
    padding: "20px",
  },
  modal_header: {
    display: "flex",
  },
  modal_data: {
    display: "flex",
    flexDirection: "column",
    marginTop: "1rem",
  },
  divider: {
    backgroundColor: "rgba(255,255,255,0.5)",
    margin: "10px 0",
  },
});

const ReviewModal = ({ open, handleModalClose }) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="Rating Modal"
      aria-describedby="product rating"
      className={classes.modal}
      open={open}
      onClose={handleModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={10} md={6} container className={classes.paper}>
            <Grid
              item
              xs={12}
              justify="space-between"
              alignItems="center"
              className={classes.modal_header}
            >
              <Typography variant="h5">Submit Review</Typography>
              <Button
                variant="contained"
                onClick={handleModalClose}
                style={{
                  color: "white",
                  backgroundColor: "#000",
                }}
              >
                <CloseIcon />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.divider} />
            </Grid>
            <Grid item xs={12} className={classes.modal_data}>
              <Rating
                size="large"
                defaultValue={0.0}
                precision={0.5}
                name="user-rating"
                value={0}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                style={{ alignSelf: "flex-start" }}
              />
              <TextareaAutosize
                rowsMin={5}
                placeholder="Write your feedback here..."
              ></TextareaAutosize>
              <Button
                variant="contained"
                style={{
                  margin: "10px 0",
                  alignSelf: "center",
                  width: "30%",
                  color: "white",
                  backgroundColor: "#000",
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Fade>
    </Modal>
  );
};

export default ReviewModal;