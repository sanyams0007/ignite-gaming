import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Components and Pages
import Game from "./product/Game";
import ToastAlert from "./layout/ToastAlert";
import MetaData from "./layout/MetaData";
import Loader from "./layout/Loader";
import { Grid, Box, Typography, Paper } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import Rating from "@material-ui/lab/Rating";
import Pagination from "@material-ui/lab/Pagination";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import { getProducts } from "../actions/productActions";

const Home = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 500]);
  const [value, setValue] = useState([1, 500]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const categories = [
    "RPG",
    "Shooter/FPS",
    "Shooter/TPS",
    "Action",
    "Adventure",
    "Horror",
    "Survival/Strategy",
    "Racing",
    "Sports/Outdoor",
    "Fighting",
    "Battle Royale",
  ];

  const marks = [
    {
      value: 0,
      label: "$0",
    },
    {
      value: 500,
      label: "$500",
    },
  ];

  const { keyword } = useParams();
  const {
    loading,
    products,
    error,
    productsCount,
    resultsPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (event, value) => {
    setCurrentPage(value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePrice = (event, newValue) => {
    setPrice(value);
  };

  useEffect(() => {
    if (error) {
      return;
    }
    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, error, keyword, currentPage, price, category, rating]);

  let count = productsCount;

  if (keyword) {
    count = filteredProductsCount;
  }

  let pages = Math.ceil(count / resultsPerPage);

  console.log(count, pages);
  return (
    <>
      <MetaData title={"Best Gaming Platform"} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Grid item xs={false} sm={1} lg={keyword ? 1 : 2}></Grid>
          <Grid
            item
            xs={12}
            sm={10}
            lg={keyword ? 10 : 8}
            container
            spacing={3}
            style={{ margin: "0" }}
          >
            {keyword ? (
              <>
                <Grid item xs={12}>
                  <Typography variant="h2" Align="center" component="h2">
                    Search results
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4} md={3}>
                  <Paper>
                    <Typography gutterBottom>Advance Searching</Typography>
                    <Box my={2} pr={2}>
                      <Typography variant="h5">Price</Typography>
                      <Slider
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        getAriaValueText={(newValue) => `$${newValue}`}
                        valueLabelFormat={(newValue) => `$${newValue}`}
                        min={0}
                        max={500}
                        onChangeCommitted={handlePrice}
                        marks={marks}
                      />
                    </Box>
                    <Box>
                      <Typography variant="h5">Categories</Typography>
                      <ul>
                        {categories.map((category) => (
                          <li
                            key={category}
                            onClick={() => setCategory(category)}
                          >
                            {category}
                          </li>
                        ))}
                      </ul>
                    </Box>
                    <Box>
                      <Typography variant="h5">Ratings</Typography>
                      <ul>
                        {[5, 4, 3, 2, 1].map((star) => (
                          <li key={star} onClick={() => setRating(star)}>
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
                  <Typography variant="h2" Align="center" component="h2">
                    Latest <span>Products</span>
                  </Typography>
                </Grid>
                <Grid item xs={12} container spacing={2} v>
                  {products &&
                    products.map((product) => (
                      <Grid key={product._id} item xs={12} sm={6} md={4}>
                        <Game product={product} />
                      </Grid>
                    ))}
                </Grid>
              </>
            )}
            {pages >= 2 && (
              <Grid item xs={12}>
                {/* <Pagination
                  page={currentPage}
                  pages={pages}
                  changePage={setCurrentPageNo}
                /> */}
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
          <Grid item xs={false} sm={1} lg={keyword ? 1 : 2}></Grid>
          {error && <ToastAlert message={error} severity="error" />}
        </>
      )}
    </>
  );
};

export default Home;
