import { useState, useEffect } from "react";
import styled from "styled-components";
import { Board, Keyboard } from "./components";
import { keyboard, TileStatus } from "./constants";
import { initialiseBoard } from "./utils";
import {
  handleEnterKey,
  handleBackspaceKey,
  handleAlphabeticalKey,
} from "./handlers";

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

const App = ({ wordle }: AppProps) => {
  const [boardState, setBoardState] = useState<BoardState>(initialiseBoard());
  const [currentRow, setCurrentRow] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  });

  const keyDownHandler = (e: KeyboardEvent) => {
    const key = e.key.toUpperCase();

    keyboard.forEach((keyboardRow) => {
      if (keyboardRow.some((keyboardKey) => keyboardKey === key)) {
        return clickHandler(key);
      }
    });
  };

  const clickHandler = (key: string) => {
    switch (key) {
      case "ENTER":
        return handleEnterKey(
          boardState,
          currentRow,
          updateRowState,
          setCurrentRow,
          setCurrentColumn
        );
      case "BACKSPACE":
        return handleBackspaceKey(
          boardState,
          currentRow,
          currentColumn,
          setBoardState,
          setCurrentColumn
        );
      default:
        return handleAlphabeticalKey(
          key,
          boardState,
          currentRow,
          currentColumn,
          setBoardState,
          setCurrentColumn
        );
    }
  };

  const updateRowState = () => {
    const withCorrectSpotTiles = boardState[currentRow].map((tile, index) => {
      const isCorrectSpot = tile.letter === wordle.charAt(index);

      return isCorrectSpot
        ? { ...tile, status: TileStatus.CORRECT_SPOT }
        : tile;
    });

    const withWrongSpotTiles = withCorrectSpotTiles.map((tile, index, row) => {
      if (tile.status !== TileStatus.UNSET) return tile;

      if (wordle.includes(tile.letter)) {
        const duplicateLetters = row.filter((t, i) => {
          // const isNotCurrentTile = i !== index;
          const isUnsetTile = t.status === TileStatus.UNSET;
          const isDuplicateLetter = t.letter === tile.letter;

          return /** isNotCurrentTile && */ isUnsetTile && isDuplicateLetter;
        });

        // console.log("Duplicate letters: ", duplicateLetters);

        // const wordleArray = [...wordle];
        // console.log("Wordle as array: ", wordleArray);

        if (duplicateLetters.length) {
          return { ...tile, status: TileStatus.WRONG_SPOT };
        }
      }

      return tile;
    });

    const withNotInWordTiles = withWrongSpotTiles.map((tile) => {
      const isNotInWord = !wordle.includes(tile.letter);
      const isUnset = tile.status === TileStatus.UNSET;

      return isNotInWord || isUnset
        ? { ...tile, status: TileStatus.NOT_IN_WORD }
        : tile;
    });

    setBoardState(() => {
      const newBoardState = boardState;
      newBoardState[currentRow] = withNotInWordTiles;

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
