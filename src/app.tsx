import { useState } from "react";
import styled from "styled-components";
import Keyboard from "./components/keyboard";
import Board from "./components/board";
import { TileStatus } from "./constants/enums";
import getWordle from "./get-wordle";
import { initialiseBoard } from "./util/initialise-board";

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

const wordle = getWordle();

const App = () => {
  const [boardPosition, setBoardPosition] = useState<BoardPosition>({
    row: 0,
    col: 0,
  });

  const [boardState, setBoardState] = useState<BoardState>(initialiseBoard());

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
    if (boardState[boardPosition.row][boardPosition.col].letter === "") {
      setBoardState(() => {
        const newBoardState: BoardState = [...boardState];
        newBoardState[boardPosition.row][boardPosition.col].letter =
          selectedKey;
        return newBoardState;
      });

      if (boardPosition.col <= 4) {
        setBoardPosition({
          row: boardPosition.row,
          col: boardPosition.col + 1,
        });
      }
    }
  };

  const handleBackspace = () => {
    if (boardPosition.col > 0) {
      const newBoardPosition = {
        row: boardPosition.row,
        col: boardPosition.col - 1,
      };

      setBoardState(() => {
        const newBoardState: BoardState = [...boardState];
        newBoardState[newBoardPosition.row][newBoardPosition.col].letter = "";
        return newBoardState;
      });

      setBoardPosition(newBoardPosition);
    }
  };

  const handleEnterKey = () => {
    if (boardState[boardPosition.row][4].letter !== "") {
      updateRowStatus();
      setBoardPosition({ row: boardPosition.row + 1, col: 0 });
    }
  };

  const updateTileStatus = (tile: TileState, index: number) => {
    if (wordle.charAt(index) === tile.letter) {
      return { ...tile, status: TileStatus.CORRECT_SPOT };
    }
    // This check needs to take into account other letters in the correct placement already
    if (wordle.includes(tile.letter)) {
      return { ...tile, status: TileStatus.WRONG_SPOT };
    }
    return { ...tile, status: TileStatus.NOT_IN_WORD };
  };

  const updateRowStatus = () => {
    const completedRow = boardState[boardPosition.row];
    const newRowState = completedRow.map((tile, index) =>
      updateTileStatus(tile, index)
    );

    setBoardState(() => {
      const newBoardState = boardState;
      newBoardState[boardPosition.row] = [
        newRowState[0],
        newRowState[1],
        newRowState[2],
        newRowState[3],
        newRowState[4],
      ];

      return newBoardState;
    });
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
