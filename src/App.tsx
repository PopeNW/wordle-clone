import { useState } from "react";
import styled from "styled-components";
import Keyboard from "./components/keyboard";
import Board from "./components/board";
import { KeyboardValues } from "./components/keyboard";

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

/* 
Change plan

I want to only re-render when the grid state changes.

Currently, the App re-renders anytime there is a button press.
This is not working well.

I want to create a clickHandler function which will be called 
whenever I click a button, and update the grid state.

*/
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
    if (selectedKey === KeyboardValues.ENTER) {
      handleEnterKey();
    } else if (selectedKey === KeyboardValues.BACKSPACE) {
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
    // WIP
    // if (boardPosition[1] > 0) {
    //   setBoardPosition([boardPosition[0], boardPosition[1] - 1]);
    //   setBoardState(() => {
    //     const newBoardState: BoardState = [...boardState];
    //     newBoardState[boardPosition[0]][boardPosition[1]] = "";
    //     return newBoardState;
    //   });
    // } else if (boardPosition[1] === 0) {
    //   setBoardState(() => {
    //     const newBoardState: BoardState = [...boardState];
    //     newBoardState[boardPosition[0]][boardPosition[1]] = "";
    //     return newBoardState;
    //   });
    // }
  };

  return (
    <StyledApp>
      <StyledHeader>
        <StyledTitle>It's Another Wordle Clone! 🤪</StyledTitle>
      </StyledHeader>
      <Board boardState={boardState} />
      <Keyboard clickHandler={clickHandler} />
    </StyledApp>
  );
};

export default App;
