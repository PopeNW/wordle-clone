interface TileState {
  letter: string;
  status: number;
}

type RowState = [TileState, TileState, TileState, TileState, TileState];

type BoardState = [RowState, RowState, RowState, RowState, RowState, RowState];

interface IBoard {
  boardState: BoardState;
}
