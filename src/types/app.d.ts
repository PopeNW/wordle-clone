interface BoardPosition {
  row: number;
  col: number;
}

interface AppProps {
  wordle: string;
}

type SetBoardState = (newState: () => BoardState) => void;

type SetNumberState = (newState: number) => void;

type VoidFunction = () => void;
