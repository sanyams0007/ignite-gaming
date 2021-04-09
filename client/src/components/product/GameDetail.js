import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearError } from "../../actions/productActions";

import styled from "styled-components";
import CloseIcon from "@material-ui/icons/Close";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Carousel } from "react-bootstrap";
// Components and Pages
import ToastAlert from "../layout/ToastAlert";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const GameDetail = () => {
  const { id } = useParams();
  console.log(useParams());
  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(id));

    if (error) dispatch(clearError());
  }, [dispatch, error, id]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <ToastAlert message={error} severity="error" />
      ) : (
        <GameDetailContainer>
          <MetaData title={product.name} />
          <ImgContainer className="">
            <Carousel pause="hover">
              {product.images &&
                product.images.map((image) => (
                  <Carousel.Item key={image.public_id}>
                    <img
                      className="d-block w-100"
                      src={image.url}
                      alt={product.title}
                    />
                  </Carousel.Item>
                ))}
            </Carousel>
          </ImgContainer>
          <DetailContainer className="">
            <h3>{product.name}</h3>
            <p>Product # {product._id}</p>
            <div className="rating">
              <Rating
                defaultValue={0.0}
                precision={0.5}
                name="read-only"
                value={product.ratings}
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
                readOnly
              />
              <span>{`(${product.numOfReviews} Reviews)`}</span>
            </div>

            <p className="price">
              <span>$ </span>
              {product.price}
            </p>
            <div className="cart">
              <span>-</span>
              <input type="number" value="1" readOnly />
              <span>+</span>
              <button>
                <AddShoppingCartIcon /> Add to cart
              </button>
            </div>

            <p className="stock">
              Status:
              <span>{product.stock > 0 ? "In Stock" : "Out Of Stock"}</span>
            </p>
            <div className="detail">
              <h4>Description :</h4>
              <p className="date">Release Date: 22/2/2021</p>
              <p>{product.description}</p>
            </div>
            <p className="seller">
              Sold By: <strong>{product.seller}</strong>
            </p>
            <button>Submit Your Review</button>
            <ModalContainer className="">
              <div className="border">
                <div className="modal-header">
                  <h3>Submit Review</h3>
                  <button>
                    <CloseIcon />
                  </button>
                </div>
                <div className="modal-data">
                  <Rating
                    size="large"
                    defaultValue={0.0}
                    precision={0.5}
                    name="user-rating"
                    value={3}
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  />
                  <textarea></textarea>
                  <button>Submit</button>
                </div>
              </div>
            </ModalContainer>
          </DetailContainer>
        </GameDetailContainer>
      )}
    </>
  );
};

export default GameDetail;

const GameDetailContainer = styled.div`
  width: 85%;
  margin: 3rem auto;
  display: flex;
  flex-wrap: wrap;
`;
const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex: 0.45;
`;
const DetailContainer = styled.div`
  flex: 0.55;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  > h3 {
    font-size: 40px;
  }
  .price {
    span {
      color: #ff4747 !important;
    }
    font-size: 30px;
  }
  .cart {
    > input {
      width: 30px;
    }
    > span {
      font-size: 20px;
      /* background-color: red; */
    }
    > button {
      margin: 0 10px;
    }
  }
  .rating,
  .stock {
    padding: 1rem 0;
    margin: 1rem 0;
    align-self: stretch;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    > span {
      font-weight: bold;
    }
  }

  .detail > .date,
  .seller {
    margin: 1rem 0;
  }
`;
const ModalContainer = styled.div`
  display: none;
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  transition: 0.5s;

  > div {
    background: #9922ee;
    margin: 5rem auto;
    position: relative;
    width: 60%;
    height: 60vh;
    padding: 1rem 3rem;
    button {
      align-self: center;
      background-color: black;
    }
  }

  .modal-data {
    background: transparent;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    > textarea {
      height: 60%;
    }
  }
`;
