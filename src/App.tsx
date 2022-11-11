import styled from "styled-components";
import Keyboard from "./components/keyboard";
import Board from "./components/board";
import { useEffect, useState } from "react";

const StyledApp = styled.div`
  display: block;
`;

const StyledHeader = styled.header`
  display: flex;
  background-color: #2d468c;
  padding: 1rem;
`;

const StyledTitle = styled.h1`
  color: #eeeeee;
  margin: 0 auto;
`;

const App = () => {
  const [selectedKey, setSelectedKey] = useState(null);

  useEffect(() => {
    console.log(selectedKey);
  }, [selectedKey]);

  return (
    <StyledApp>
      <StyledHeader>
        <StyledTitle>It's Another Wordle Clone! 🤪</StyledTitle>
      </StyledHeader>
      <Board selectedKey={selectedKey} />
      <Keyboard setSelectedKey={setSelectedKey} />
    </StyledApp>
  );
};

export default App;
