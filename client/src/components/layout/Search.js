import styled from "styled-components";
import { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <NavSearch>
      <form onSubmit={searchHandler}>
        <input
          onChange={handleChange}
          value={keyword}
          type="text"
          placeholder="Search your game"
        />
        <button>
          <SearchIcon />
        </button>
      </form>
    </NavSearch>
  );
};

export default Search;

const NavSearch = styled.div`
  margin-left: auto;
  width: 25%;
  padding: 5px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #72f, #c1b);
  > form {
    width: 100%;
    display: inherit;
    > input {
      ::placeholder {
        color: white;
      }
      color: white !important;
      padding: 5px;
      width: 80%;
      text-indent: 10px;
      background-color: rgba(255, 255, 255, 0.33);
      border: none;
      outline: none;
      border-radius: 25px 0 0 25px;
      margin-right: 5px;
    }
    > button {
      width: 20%;
      padding: 0;
      border-radius: 0 25px 25px 0;
      background-color: rgba(255, 255, 255, 0.33);
      > .MuiSvgIcon-root {
        padding: 3px;
        font-size: 34px;
      }
    }
  }
`;
