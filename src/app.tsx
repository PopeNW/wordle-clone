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

const AppWrapper = styled.div`
  display: block;
`;

const HeaderWrapper = styled.header`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid #d3d6da;
`;

const TitleWrapper = styled.h1`
  font-family: "Times New Roman", Times, serif;
  font-weight: 700;
  color: #000000;
  margin: 0 auto;
`;

const OptionsWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
`;

const ModalButton = styled.button`
  cursor: pointer;
`;

const App = ({ wordle }: AppProps) => {
  const [boardState, setBoardState] = useState<BoardState>(initialiseBoard());
  const [currentRow, setCurrentRow] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isGameWin, setIsGameWin] = useState<boolean>();

  useEffect(() => {
    isGameOver();
    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  });

  const isGameOver = () => {
    if (currentRow === 0) return;

    const lastGuess = boardState[currentRow - 1];
    const isWin =
      lastGuess.filter((t) => t.status === TileStatus.CORRECT_SPOT).length ===
      lastGuess.length;
    const isGameOver = currentRow === boardState.length || isWin;

    isGameOver && setIsGameWin(isWin);

    return setGameOver(isGameOver);
  };

  const keyDownHandler = (e: KeyboardEvent) => {
    if (gameOver) return;

    const key = e.key.toUpperCase();
    keyboard.forEach((keyboardRow) => {
      if (keyboardRow.some((keyboardKey) => keyboardKey === key)) {
        return clickHandler(key);
      }
    });
  };

  const clickHandler = (key: string) => {
    if (gameOver) return;

    switch (key) {
      case "ENTER":
        return handleEnterKey(
          boardState,
          currentRow,
          updateRowState,
          setCurrentRow,
          setCurrentColumn,
        );
      case "BACKSPACE":
        return handleBackspaceKey(
          boardState,
          currentRow,
          currentColumn,
          setBoardState,
          setCurrentColumn,
        );
      default:
        return handleAlphabeticalKey(
          key,
          boardState,
          currentRow,
          currentColumn,
          setBoardState,
          setCurrentColumn,
        );
    }
  };

  const updateRowState = () => {
    const withCorrectSpot = boardState[currentRow].map((tile, index) =>
      tile.letter === wordle.charAt(index)
        ? { ...tile, status: TileStatus.CORRECT_SPOT }
        : tile,
    );

    const withNotInWord = withCorrectSpot.map((tile) =>
      !wordle.includes(tile.letter)
        ? { ...tile, status: TileStatus.NOT_IN_WORD }
        : tile,
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
            count++,
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
            count++,
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
    <AppWrapper>
      <HeaderWrapper>
        <TitleWrapper>Nathan's Wordle</TitleWrapper>
        <OptionsWrapper>
          <ModalButton onClick={() => setShowModal(true)}>
            Show Modal
          </ModalButton>
        </OptionsWrapper>
      </HeaderWrapper>
      <Board boardState={boardState} />
      <Keyboard clickHandler={clickHandler} />
      {gameOver || showModal
        ? createPortal(
            <Modal isGameWin={isGameWin} setShowModal={setShowModal} />,
            document.body,
          )
        : null}
    </AppWrapper>
  );
};

export default App;
