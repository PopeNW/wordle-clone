import React from "react";
import styled from "styled-components";
// import WordleGrid from "./components/wordle-grid";

const StyledApp = styled.div`
  text-align: center;
`;

const StyledTitle = styled.h1`
  margin: 0 auto;
  padding: 1rem;
  background-color: #2d468c;
  color: #eeeeee;
`;

const App = () => {
  return (
    <StyledApp>
      <StyledTitle>It's Another Wordle Clone! 🤪</StyledTitle>
    </StyledApp>
  );
};

export default App;
