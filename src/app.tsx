import { useState } from "react";
import styled from "styled-components";
import Keyboard from "./components/keyboard";
import Board from "./components/board";
import { TileStatus } from "./constants/enums";
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

const App = ({ wordle }: AppProps) => {
  const [boardState, setBoardState] = useState<BoardState>(initialiseBoard());
  const [currentRow, setCurrentRow] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);

  // useEffect(() => document.addEventListener("keydown", keyDownHandler, true));

  // const keyDownHandler = (e: KeyboardEvent) => clickHandler(e.key);

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
    if (boardState[currentRow][currentColumn]?.letter !== undefined) {
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
      updateRowState();
      setCurrentRow(currentRow + 1);
      setCurrentColumn(0);
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

  // const updateTileState = (tile: TileState, index: number) => {
  //   if (wordle.charAt(index) === tile.letter) {
  //     return { ...tile, status: TileStatus.CORRECT_SPOT };
  //   }

  //   if (wordle.includes(tile.letter)) {
  //     return { ...tile, status: TileStatus.WRONG_SPOT };
  //   }

  //   return { ...tile, status: TileStatus.NOT_IN_WORD };
  // };

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
