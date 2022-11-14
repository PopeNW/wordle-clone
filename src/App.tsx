import { useEffect, useState } from "react";
import styled from "styled-components";
import Keyboard from "./components/keyboard";
import Board from "./components/board";

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
  const [selectedKey, setSelectedKey] = useState("");
  const [grid, setGrid] = useState<BoardState>([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  useEffect(() => {
    setGrid((g) => {
      const newGrid: BoardState = [...g];
      newGrid[0][0] = selectedKey;
      return newGrid;
    });
  }, [selectedKey]);

  return (
    <StyledApp>
      <StyledHeader>
        <StyledTitle>It's Another Wordle Clone! 🤪</StyledTitle>
      </StyledHeader>
      <Board grid={grid} />
      <Keyboard setSelectedKey={setSelectedKey} />
    </StyledApp>
  );
};

export default App;
