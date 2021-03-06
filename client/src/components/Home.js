import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "material-react-toastify";

// Components and Pages
import Game from "./product/Game";
import MetaData from "./layout/MetaData";
import Loader from "./layout/Loader";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/core/Slider";
import Rating from "@material-ui/lab/Rating";
import Pagination from "@material-ui/lab/Pagination";
import StarBorderIcon from "@material-ui/icons/StarBorder";
/* import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done"; */
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { getProducts } from "../actions/productActions";
import { categories, marks } from "./util";

const Home = () => {
  const dispatch = useDispatch();

  const { keyword } = useParams();
  const {
    loading,
    products,
    error,
    page,
    productsCount,
    resultsPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(
    () => JSON.parse(sessionStorage.getItem("lastPage")) || 1
  );
  const [price, setPrice] = useState([1, 500]);
  const [value, setValue] = useState([1, 500]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const setCurrentPageNo = (event, value) => {
    setCurrentPage(value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePrice = (event, newValue) => {
    setPrice(value);
  };

  let count = productsCount;

  if (keyword) {
    count = filteredProductsCount;
  }

  let pages = Math.ceil(count / resultsPerPage);

  useEffect(() => {
    if (error) {
      toast.error(error);
      return;
    }

    dispatch(getProducts(keyword, currentPage, price, category, rating));

    return () => {
      sessionStorage.setItem("lastPage", JSON.stringify(currentPage));
    };
  }, [dispatch, error, keyword, currentPage, price, category, rating]);

  useEffect(() => {
    if (keyword) {
      setCurrentPage(1);
    }
  }, [keyword]);

  return (
    <>
      <MetaData title={"Best Gaming Platform"} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Grid
            item
            xs={12}
            sm={10}
            lg={keyword ? 10 : 8}
            container
            spacing={3}
            style={{ margin: "0 auto" }}
          >
            {keyword ? (
              <>
                <Grid item xs={12}>
                  <Typography variant="h2" align="center" component="h2">
                    {products.length > 0 ? "Search results" : "No match found"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                  <Paper
                    elevation={0}
                    style={{
                      backgroundColor: "rgba(255,255,255,.10)",
                      padding: "15px",
                      position: "sticky",
                      top: "60px",
                    }}
                  >
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="h5" gutterBottom>
                        Advance Filters
                      </Typography>
                      {/* <Chip
                        color="primary"
                        label="Clear all"
                        onDelete={handleDelete}
                        deleteIcon={<DoneIcon />}
                      /> */}
                    </Box>
                    <Box>
                      <Typography>Price</Typography>
                      <Slider
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        getAriaValueText={(newValue) => `$${newValue}`}
                        valueLabelFormat={(newValue) => `$${newValue}`}
                        min={1}
                        max={500}
                        onChangeCommitted={handlePrice}
                        marks={marks}
                      />
                    </Box>
                    <Box my={2}>
                      <Typography>Genres</Typography>

                      <Select
                        fullWidth
                        displayEmpty
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{
                          background: "#c1c1c1",
                          borderRadius: "5px",
                          textIndent: "5px",
                          marginTop: "10px",
                        }}
                      >
                        <MenuItem value="" disabled>
                          Select Genre
                        </MenuItem>
                        <MenuItem value="">All</MenuItem>
                        {categories.map((category) => (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                    <Box>
                      <Typography>Ratings</Typography>
                      <ul>
                        {[5, 4, 3, 2, 1].map((star) => (
                          <li
                            style={{ padding: "5px 0 0 10px" }}
                            key={star}
                            onClick={() => setRating(star)}
                          >
                            <Rating
                              defaultValue={star}
                              name="user-rating"
                              value={star}
                              readOnly
                              emptyIcon={<StarBorderIcon fontSize="inherit" />}
                            />
                          </li>
                        ))}
                      </ul>
                    </Box>
                  </Paper>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={9}
                  container
                  alignContent="flex-start"
                  spacing={2}
                  style={{ margin: "0" }}
                >
                  {products &&
                    products.map((product) => (
                      <Grid key={product._id} item xs={12} sm={6} md={4}>
                        <Game product={product} />
                      </Grid>
                    ))}
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  <Typography
                    variant="h2"
                    align="center"
                    component="h2"
                    style={{ margin: "10px 0" }}
                  >
                    Latest <span>Products</span>
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  container
                  alignContent="flex-start"
                  spacing={3}
                  style={{ margin: "0 auto" }}
                >
                  {products &&
                    products.map((product) => (
                      <Grid key={product._id} item xs={12} sm={6} md={4} xl={3}>
                        <Game product={product} />
                      </Grid>
                    ))}
                </Grid>
              </>
            )}
            {pages >= 2 && (
              <Grid item xs={12}>
                <Pagination
                  color="secondary"
                  size="large"
                  page={currentPage}
                  defaultPage={1}
                  count={pages}
                  onChange={setCurrentPageNo}
                />
              </Grid>
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default Home;
