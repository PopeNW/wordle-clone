import { useState } from "react";
import styled from "styled-components";
import Keyboard from "./components/keyboard";
import Board from "./components/board";
import { TileStatus } from "./types/enums";

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

const wordle = "DUCKS";

const App = () => {
  const [boardPosition, setBoardPosition] = useState<BoardPosition>({
    row: 0,
    col: 0,
  });
  const [boardState, setBoardState] = useState<BoardState>([
    [
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
    ],
    [
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
    ],
    [
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
    ],
    [
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
    ],
    [
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
    ],
    [
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
    ],
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
      updateRowTilesStatus();
      setBoardPosition({ row: boardPosition.row + 1, col: 0 });
    }
  };

  const updateRowTilesStatus = () => {
    const currentGuess = boardState[boardPosition.row];

    const newRowState = currentGuess.map((tile, index) => {
      let newTile = tile;

      if (wordle.charAt(index) === tile.letter) {
        newTile = { ...tile, status: TileStatus.CORRECT_SPOT };
      }

      return newTile;
    });

    setBoardState(() => {
      const newBoardState = boardState;
      newBoardState[boardPosition.row] = newRowState as RowState;
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
