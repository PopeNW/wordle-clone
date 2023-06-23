import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { Board, Keyboard, Modal } from "./components";
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
  const [showModal, setShowModal] = useState(false);

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
    const withCorrectSpot = boardState[currentRow].map((tile, index) =>
      tile.letter === wordle.charAt(index)
        ? { ...tile, status: TileStatus.CORRECT_SPOT }
        : tile
    );

    const withNotInWord = withCorrectSpot.map((tile) =>
      !wordle.includes(tile.letter)
        ? { ...tile, status: TileStatus.NOT_IN_WORD }
        : tile
    );

    const withWrongSpot = withNotInWord.map((tile, index, row) => {
      if (tile.status !== TileStatus.UNSET) return tile;

      const countOccurences = () => {
        let count = 0;
        [...wordle].forEach((letter) => letter === tile.letter && count++);
        return count;
      };

      const countCorrectSpotOccurences = () => {
        let count = 0;
        row.forEach(
          (t, i) =>
            i !== index &&
            t.letter === tile.letter &&
            t.status === TileStatus.CORRECT_SPOT &&
            count++
        );
        return count;
      };

      const countWrongSpotOccurences = () => {
        let count = 0;
        row.forEach(
          (t, i) =>
            i !== index &&
            t.letter === tile.letter &&
            t.status === TileStatus.WRONG_SPOT &&
            count++
        );
        return count;
      };

      const occurencesCount = countOccurences();
      const correctSpotCount = countCorrectSpotOccurences();
      const wrongSpotCount = countWrongSpotOccurences();
      const unsetCount = occurencesCount - correctSpotCount - wrongSpotCount;

      return unsetCount
        ? (row[index] = { ...tile, status: TileStatus.WRONG_SPOT })
        : (row[index] = { ...tile, status: TileStatus.NOT_IN_WORD });
    });

    setBoardState(() => {
      const newBoardState = boardState;
      newBoardState[currentRow] = withWrongSpot;
      return newBoardState;
    });
  };

  return (
    <StyledApp>
      <StyledHeader>
        <StyledTitle>Nathan's Wordle</StyledTitle>
        <button onClick={() => setShowModal(true)}>Show Modal</button>
      </StyledHeader>
      <Board boardState={boardState} />
      <Keyboard clickHandler={clickHandler} />
      {showModal &&
        createPortal(<Modal setShowModal={setShowModal} />, document.body)}
    </StyledApp>
  );
};

export default App;
