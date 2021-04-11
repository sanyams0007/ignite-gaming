import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Components and Pages
import Game from "./product/Game";
import ToastAlert from "./layout/ToastAlert";
import MetaData from "./layout/MetaData";
import Loader from "./layout/Loader";
import Pagination from "./layout/Pagination";
import Slider from "@material-ui/core/Slider";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import { getProducts } from "../actions/productActions";

const Home = () => {
  const dispatch = useDispatch();

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

  const [currentPage, setCurrentPage] = useState(1);

  const { keyword } = useParams();

  const {
    loading,
    products,
    error,
    productsCount,
    page,
    resultsPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePrice = (event, newValue) => {
    setPrice(value);
  };

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
  //if (page > pages) setCurrentPageNo(1);

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

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <ToastAlert message={error} severity="error" />
      ) : (
        <HomeContainer className="center-section">
          {/* <Container> */}
          <MetaData title={"Best Gaming Platform"} />
          <h2 className="text-center mt-3 mb-5">
            Latest <span>Product</span>
          </h2>
          <GameContainer>
            {keyword ? (
              <>
                <SliderContainer>
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
                  <hr />
                  <div className="mt-5">
                    <h4 className="mb-3">Categories</h4>
                    <ul className="pl-0">
                      {categories.map((category) => (
                        <li
                          key={category}
                          onClick={() => setCategory(category)}
                        >
                          {category}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <hr />
                  <div className="mt-5">
                    <h4 className="mb-3">Ratings</h4>
                    <ul className="pl-0">
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
                  </div>
                </SliderContainer>
                {products &&
                  products.map((product) => (
                    <Game key={product._id} product={product} />
                  ))}
              </>
            ) : (
              products &&
              products.map((product) => (
                <Game key={product._id} product={product} />
              ))
            )}
          </GameContainer>
          {resultsPerPage <= count && (
            <Pagination
              page={currentPage}
              pages={pages}
              changePage={setCurrentPageNo}
            />
          )}
          {/* </Container> */}
        </HomeContainer>
      )}
    </>
  );
};

export default Home;

const HomeContainer = styled.div`
  border: 1px solid;
`;

const GameContainer = styled.div`
  min-height: 80vh;
  border: 1px solid;
  padding: 0 7.5%;
  display: grid;
  justify-content: start;
  align-items: start;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  /*grid-template-columns: repeat(auto-fit, minmax(270px, 33%)); 
   grid-template-columns: auto auto auto; */
  grid-column-gap: 1.5rem;
  grid-row-gap: 2.5rem;
`;

const SearchGameContainer = styled.div`
  min-height: 80vh;
  border: 1px solid;
  display: grid;
  justify-content: start;
  align-items: start;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  /*grid-template-columns: repeat(auto-fit, minmax(270px, 33%)); 
   grid-template-columns: auto auto auto; */
  grid-column-gap: 1.5rem;
  grid-row-gap: 2.5rem;
`;

const SliderContainer = styled.div`
  /* max-width: 200px;
  height: 20px;
  margin: 20px auto; */
  border: 1px solid;

  .MuiSlider-root {
    width: 100% !important;
    color: #9922ee !important;

    span.MuiSlider-markLabel {
      color: white !important;
    }
    span.MuiSlider-rail,
    span.MuiSlider-track {
      background: linear-gradient(145deg, #72f, #c1b) !important;
    }
  }
`;
