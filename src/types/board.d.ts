type RowState = [string, string, string, string, string];

type BoardState = [RowState, RowState, RowState, RowState, RowState, RowState];

interface IBoard {
  boardState: BoardState;
}
