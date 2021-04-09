//Animation and Icons
import styled from "styled-components";
import logo from "../../images/flame.svg";
import { ShoppingCart } from "@material-ui/icons/";
import { Route } from "react-router-dom";
import SearchInput from "./SearchInput";

const Header = () => {
  return (
    <HeaderContainer>
      <StyledNav>
        <LogoContainer>
          <img src={logo} alt="logo" />
          <h1>Ignite Gaming</h1>
        </LogoContainer>
        <Route render={({ history }) => <SearchInput history={history} />} />
        <button>Login</button>
        <button>
          <ShoppingCart />
          <span>5</span>
        </button>
      </StyledNav>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header``;

const StyledNav = styled.nav`
  padding: 12px 7.5%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  > button {
    font-weight: 700;
    margin-left: 20px;
    background-color: #9922ee;
    border-radius: 25px;
    padding: 10px 30px;
    position: relative;

    > span {
      margin-top: 0;
      font-size: 10px;
      position: absolute;
    }
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  > img {
    width: 60px;
    object-fit: contain;
    height: 80px;
  }
  > h1 {
    font-size: clamp();
    margin-left: 10px;
    font-weight: bold;
  }
`;
