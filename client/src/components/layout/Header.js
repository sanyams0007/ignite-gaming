//Animation and Icons
import styled from "styled-components";
import logo from "../../images/flame.svg";
import { Search, ShoppingCart } from "@material-ui/icons/";

const Header = () => {
  return (
    <HeaderContainer>
      <StyledNav>
        <LogoContainer>
          <img src={logo} alt="logo" />
          <h1>Ignite Gaming</h1>
        </LogoContainer>
        <NavSearch>
          <input type="text" placeholder="Search your game" />
          <Search />
        </NavSearch>
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

const NavSearch = styled.div`
  margin-left: auto;
  width: 25%;
  padding: 5px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #72f, #c1b);
  > input {
    ::placeholder {
      color: white;
    }
    padding: 5px;
    width: 80%;
    text-indent: 10px;
    color: #f1f1f1;
    background-color: rgba(255, 255, 255, 0.33);
    border: none;
    outline: none;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    margin-right: 5px;
  }
  > .MuiSvgIcon-root {
    width: 20%;
    padding: 5px;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    font-size: 34px;
    background-color: rgba(255, 255, 255, 0.33);
  }
`;
