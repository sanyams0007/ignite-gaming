import { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
// Components and Pages
import Game from "./product/Game";
import ToastAlert from "./layout/ToastAlert";
import MetaData from "./layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Loader from "./layout/Loader";

const Home = () => {
  const dispatch = useDispatch();

  const {
    loading,
    products,
    error,
    productsCount,
    resultsPerPage,
    pages,
  } = useSelector((state) => state.products);

  const { keyword } = useParams();
  console.log(useParams());

  useEffect(() => {
    if (error) {
      return;
    }
    dispatch(getProducts(keyword));
  }, [dispatch, error, keyword]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <ToastAlert message={error} severity="error" />
      ) : (
        <div className="container conatiner-fluid">
          <MetaData title={"Best Gaming Platform"} />
          <h2 className="text-center mt-3 mb-5">
            Latest <span>Product</span>
          </h2>
          <GameContainer>
            {products &&
              products.map((product) => {
                return <Game key={product._id} product={product} />;
              })}
          </GameContainer>
        </div>
      )}
    </>
  );
};

export default Home;

const GameContainer = styled.div`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  grid-column-gap: 1.5rem;
  grid-row-gap: 2.5rem;
`;
