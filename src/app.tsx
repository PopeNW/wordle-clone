import { useState, useEffect } from "react";
import styled from "styled-components";
import Keyboard from "./components/keyboard";
import Board from "./components/board";
import { keyboard } from "./constants";
import { TileStatus } from "./constants";
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
    const withCorrectSpotStatuses = boardState[currentRow].map(
      (tile, index) => {
        if (tile.letter === wordle.charAt(index)) {
          return { ...tile, status: TileStatus.CORRECT_SPOT };
        }

        return tile;
      }
    );

    const withWrongSpotStatuses = withCorrectSpotStatuses.map(
      (tile, _index, row) => {
        if (tile.status !== TileStatus.UNSET) return tile;

        if (wordle.includes(tile.letter)) {
          const duplicateLetters = row.filter(
            (t, i) => t.letter === tile.letter && t.status === TileStatus.UNSET
          );

          console.log(duplicateLetters);

          if (duplicateLetters.length) {
            return { ...tile, status: TileStatus.WRONG_SPOT };
          }
        }

        return tile;
      }
    );

    const withNotInWordStatuses = withWrongSpotStatuses.map((tile) => {
      if (tile.status === TileStatus.UNSET) {
        return { ...tile, status: TileStatus.NOT_IN_WORD };
      }

      return tile;
    });

    setBoardState(() => {
      const newBoardState = boardState;
      newBoardState[currentRow] = withNotInWordStatuses;
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
