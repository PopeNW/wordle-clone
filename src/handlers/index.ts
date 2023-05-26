const handleAlphabeticalKey = (
  selectedKey: string,
  boardState: BoardState,
  currentRow: number,
  currentColumn: number,
  setBoardState: SetBoardState,
  setCurrentColumn: SetNumberState
) => {
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

const handleBackspaceKey = (
  boardState: BoardState,
  currentRow: number,
  currentColumn: number,
  setBoardState: SetBoardState,
  setCurrentColumn: SetNumberState,
) => {
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

const handleEnterKey = (
  boardState: BoardState,
  currentRow: number,
  updateRowState: VoidFunction,
  setCurrentRow: SetNumberState,
  setCurrentColumn: SetNumberState
) => {
  const lastTile = boardState[currentRow].length - 1;

  if (boardState[currentRow][lastTile].letter) {
    updateRowState();
    setCurrentRow(currentRow + 1);
    setCurrentColumn(0);
  }
};

export { handleAlphabeticalKey, handleBackspaceKey, handleEnterKey };
