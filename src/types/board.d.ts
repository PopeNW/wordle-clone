type TileStatus = 0 | 1 | 2 | 3;

interface TileState {
  letter: string;
  status: TileStatus;
}

type RowState = [TileState, TileState, TileState, TileState, TileState];

type BoardState = [RowState, RowState, RowState, RowState, RowState, RowState];

interface TileProps {
  status: TileStatus;
}

interface BoardProps {
  boardState: BoardState;
}
