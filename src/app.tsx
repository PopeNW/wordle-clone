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

const App = () => {
  const [wordle] = useState(getWordle());
  const [boardState, setBoardState] = useState<BoardState>(initialiseBoard());
  const [currentRow, setCurrentRow] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);

  const clickHandler = (selectedKey: string) => {
    switch (selectedKey) {
      case "ENTER":
        return handleEnterKey();
      case "BACKSPACE":
        return handleBackspace();
      default:
        return handleAlphabeticalKey(selectedKey);
    }
  };

  const handleAlphabeticalKey = (selectedKey: string) => {
    if (!boardState[currentRow][currentColumn].letter) {
      setBoardState(() => {
        const newBoardState: BoardState = [...boardState];
        newBoardState[currentRow][currentColumn].letter = selectedKey;
        return newBoardState;
      });

      if (currentColumn <= 4) {
        setCurrentColumn(currentColumn + 1);
      }
    }
  };

  const handleBackspace = () => {
    if (currentColumn > 0) {
      const newCurrentColumn = currentColumn - 1;

      setBoardState(() => {
        const newBoardState: BoardState = [...boardState];
        newBoardState[currentRow][newCurrentColumn].letter = "";
        return newBoardState;
      });

      setCurrentColumn(newCurrentColumn);
    }
  };

  const handleEnterKey = () => {
    const lastTile = boardState[currentRow].length - 1;

    if (boardState[currentRow][lastTile].letter) {
      updateRowStatus();
      setCurrentRow(currentRow + 1);
      setCurrentColumn(0);
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
    const completedRow = boardState[currentRow];
    const newRowState = completedRow.map((tile, index) =>
      updateTileStatus(tile, index)
    );

    setBoardState(() => {
      const newBoardState = boardState;
      newBoardState[currentRow] = newRowState;
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
