import { Link, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
//Components and Pages
import logo from "../../images/flame.svg";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Search from "./Search";
//import { Button } from "@material-ui/core";
import { logout } from "../../actions/userActions";
import UserInfo from "../UserInfo";
//import ToastAlert from "../layout/ToastAlert";

const Header = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    /* setMsg("Logout Successfull");
    setTimeout(() => setMsg(""), 5000); */
  };

  return (
    <HeaderContainer>
      <StyledNav className="center-section">
        <LogoContainer>
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>Ignite Gaming</h1>
          </Link>
        </LogoContainer>

        <Route render={({ history }) => <Search history={history} />} />

        <button>
          <Link to="/cart">
            <ShoppingCart />
            <span>{cartItems.length}</span>
          </Link>
        </button>

        {user ? (
          <UserInfo user={user} logout={handleLogout} />
        ) : (
          !loading && (
            <button>
              <Link to="/login">Sign In</Link>
            </button>
          )
        )}
      </StyledNav>
      {/*  {msg && <ToastAlert message={msg} severity="success" />} */}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const StyledNav = styled.nav`
  padding: 15px 0;
  display: flex;
  align-items: center;
  > button {
    font-weight: 700;
    margin: 0 10px;
    padding: 10px 25px;

    > span {
      margin-top: 0;
      font-size: 10px;
      position: absolute;
    }
  }
`;

const LogoContainer = styled.div`
  > a {
    display: flex;
    align-items: center;
    > img {
      width: 60px;
      object-fit: contain;
      height: 60px;
    }
    > h1 {
      margin-left: 10px;
      font-weight: bold;
    }
  }
`;
