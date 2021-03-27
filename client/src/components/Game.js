import StarIcon from "@material-ui/icons/Star";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import styled from "styled-components";

const Game = ({ data }) => {
  return (
    <StyledGame className="">
      <img className="" src={data.images[0].url} alt={data.name} />
      <div className="game_info">
        <h5 className="card-title">
          <a href="#root">{data.name}</a>
        </h5>
        <div>
          <div className="rating_outer">
            <div className="rating_inner"></div>
            <span id="no_of_reviews">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              (5 Reviews)
            </span>
          </div>
        </div>
        <p className="card-text">$119.99</p>
        <div className="buttons">
          <a className="btn" href="#root">
            Detail
          </a>
          <a className="btn" href="#root">
            <AddShoppingCartIcon />
          </a>
        </div>
      </div>
    </StyledGame>
  );
};

export default Game;

const StyledGame = styled.div`
  text-align: center;
  //box-shadow: 0px 2px 5px rgba(255, 255, 255, 0.2);
  > img {
    max-width: 280px;
    width: 100%;
    height: 45vh;
    object-fit: contain;
  }

  .buttons {
    //margin-top: 5px;
    display: flex;
    justify-content: space-around;
    > a {
      padding-left: 15px;
      padding-right: 15px;
      background-color: #9922ee;
      border-radius: 25px;
    }
  }

  /* > .game_info > .rating_outer {
    display: inline;
    position: relative;
    color: #fdcc0d;
    font-family: FontAwesome;

    ::before {
      content: "\f006 \f006 \f006 \f006 \f006";
    }
  }

  > .game_info > .rating-inner {
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    overflow: hidden;
    width: 0;

    ::before {
      content: "\f005 \f005 \f005 \f005 \f005";
      color: #f8ce0b;
    }
  } */
`;
