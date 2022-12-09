import { useState } from "react";
import styled from "styled-components";
import Keyboard from "./components/keyboard";
import Board from "./components/board";

const StyledApp = styled.div`
  display: block;
`;

const StyledHeader = styled.header`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #d3d6da;
`;

const StyledTitle = styled.h1`
  font-family: "Times New Roman", Times, serif;
  font-weight: 700;
  color: #000000;
  margin: 0 auto;
`;

const App = () => {
  const [boardPosition, setBoardPosition] = useState<BoardPosition>([0, 0]);
  const [boardState, setBoardState] = useState<BoardState>([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const clickHandler = (selectedKey: string) => {
    if (selectedKey === "ENTER") {
      handleEnterKey();
    } else if (selectedKey === "BACKSPACE") {
      handleBackspace();
    } else {
      handleAlphabeticalKey(selectedKey);
    }
  };

  const handleAlphabeticalKey = (selectedKey: string) => {
    if (boardState[boardPosition[0]][boardPosition[1]] === "") {
      setBoardState(() => {
        const newBoardState: BoardState = [...boardState];
        newBoardState[boardPosition[0]][boardPosition[1]] = selectedKey;
        return newBoardState;
      });
      if (boardPosition[1] < 4) {
        setBoardPosition([boardPosition[0], boardPosition[1] + 1]);
      }
    }
  };

  const handleEnterKey = () => {
    if (boardState[boardPosition[0]][4] !== "") {
      setBoardPosition([boardPosition[0] + 1, 0]);
    }
  };

  const handleBackspace = () => {
    if (boardPosition[1] > 0) {
      setBoardState(() => {
        const newBoardState: BoardState = [...boardState];
        newBoardState[boardPosition[0]][boardPosition[1] - 1] = "";
        return newBoardState;
      });
      setBoardPosition([boardPosition[0], boardPosition[1] - 1]);
    }
  };

  return (
    <StyledApp>
      <StyledHeader>
        <StyledTitle>Wordle</StyledTitle>
      </StyledHeader>
      <Board boardState={boardState} />
      <Keyboard clickHandler={clickHandler} />
    </StyledApp>
  );
};

export default App;
