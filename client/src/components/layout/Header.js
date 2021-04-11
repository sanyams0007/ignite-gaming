//Animation and Icons
import styled from "styled-components";
import logo from "../../images/flame.svg";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import { Link, Route } from "react-router-dom";
import Search from "./Search";

const Header = () => {
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

const HeaderContainer = styled.header`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const StyledNav = styled.nav`
  padding: 15px 0;
  display: flex;
  align-items: center;
  > button {
    font-weight: 700;
    margin-left: 20px;
    padding: 10px 30px;

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
