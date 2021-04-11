import React from "react";
import styled from "styled-components";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";

const Pagination = ({ page, pages, changePage }) => {
  let middlePagination;

  if (pages <= 5) {
    middlePagination = [...Array(pages)].map((_, idx) => (
      <button
        key={idx + 1}
        onClick={() => changePage(idx + 1)}
        disabled={page === idx + 1}
      >
        {idx + 1}
      </button>
    ));
  } else {
    const startValue = Math.floor((page - 1) / 5) * 5;
    middlePagination = (
      <>
        {[...Array(5)].map((_, idx) => (
          <button
            key={startValue + idx + 1}
            onClick={() => changePage(startValue + idx + 1)}
            disabled={page === startValue + idx + 1}
          >
            {startValue + idx + 1}
          </button>
        ))}
        <button>...</button>
        <button onClick={() => changePage(pages)}>{pages}</button>
      </>
    );

    if (page > 5) {
      if (pages - page >= 5) {
        middlePagination = (
          <>
            <button onClick={() => changePage(1)}>1</button>
            <button>...</button>
            <button onClick={() => changePage(startValue)}>{startValue}</button>
            {[...Array(5)].map((_, idx) => (
              <button
                key={startValue + idx + 1}
                onClick={() => changePage(startValue + idx + 1)}
                disabled={page === startValue + idx + 1}
              >
                {startValue + idx + 1}
              </button>
            ))}
            <button>...</button>
            <button onClick={() => changePage(pages)}>{pages}</button>
          </>
        );
      } else {
        let amountLeft = pages - page + 5;
        middlePagination = (
          <>
            <button onClick={() => changePage(1)}>1</button>
            <button>...</button>
            <button onClick={() => changePage(startValue)}>{startValue}</button>
            {[...Array(amountLeft)].map((_, idx) => (
              <button
                key={startValue + idx + 1}
                style={
                  pages < startValue + idx + 1 ? { display: "none" } : null
                }
                onClick={() => changePage(startValue + idx + 1)}
                disabled={page === startValue + idx + 1}
              >
                {startValue + idx + 1}
              </button>
            ))}
          </>
        );
      }
    }
  }
  return (
    <PaginationContainer>
      <button
        onClick={() => changePage((page) => page - 1)}
        disabled={page === 1}
      >
        <ChevronLeft />
      </button>
      {middlePagination}
      <button
        onClick={() => changePage((page) => page + 1)}
        disabled={page === pages}
      >
        <ChevronRight />
      </button>
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 2rem;

  > button {
    background: transparent;
    margin-right: 0.5rem;
    padding: 8px 17px;
    font-size: 18px;
  }

  > button:hover {
    background-color: #333;
  }

  > button:disabled {
    background-color: rgba(221, 34, 204, 0.8);
    color: #fff;
    cursor: not-allowed;
  }

  > button:disabled:last-of-type,
  > button:disabled:first-of-type {
    background-color: transparent;
  }
`;
