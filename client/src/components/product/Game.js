import StarBorderIcon from "@material-ui/icons/StarBorder";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Game = ({ product }) => {
  return (
    <StyledGame>
      <img className="" src={product.images[0].url} alt={product.name} />
      <div className="game_info">
        <h5 className="card-title mt-2 mb-2">{product.name}</h5>
        <Box
          display="flex"
          alignItems="center"
          component="fieldset"
          borderColor="transparent"
          justifyContent="center"
        >
          <Rating
            defaultValue={0.0}
            precision={0.5}
            name="read-only"
            value={product.ratings}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
            readOnly
          />
          <span>{` (${product.numOfReviews} Reviews)`}</span>
        </Box>

        <p className="card-text">
          <span>$ </span>
          {product.price}
        </p>
        <div className="buttons">
          <Link to={`/product/${product._id}`}>Detail</Link>
          <button>
            <AddShoppingCartIcon />
          </button>
        </div>
      </div>
    </StyledGame>
  );
};

export default Game;

const StyledGame = styled.div`
  text-align: center;
  //box-shadow: 0px 0px 2px rgba(255, 255, 255, 0.2);
  > img {
    max-width: 280px;
    width: 100%;
    height: 45vh;
    object-fit: contain;
  }

  .card-text > span {
    color: #ff4747 !important;
  }

  .buttons {
    //margin-top: 5px;
    display: flex;
    justify-content: space-around;
    > button,
    a {
      padding: 5px 15px;
      background-color: #9922ee;
      border-radius: 25px;
    }
  }
`;
