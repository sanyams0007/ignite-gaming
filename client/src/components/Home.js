import { useEffect } from "react";
import styled from "styled-components";
import MetaData from "./layout/MetaData";
// Componets and Pages
import Game from "./Game";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="container conatiner-fluid">
      <MetaData title={"Best Gaming Platform"} />
      <h2 className="text-center mt-3 mb-5">
        Latest <span>Product</span>
      </h2>
      <GameContainer>
        {products &&
          products.map((product) => {
            return <Game key={product._id} data={product} />;
          })}
      </GameContainer>
    </div>
  );
};

export default Home;

const GameContainer = styled.div`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  grid-column-gap: 1.5rem;
  grid-row-gap: 2rem;
`;
