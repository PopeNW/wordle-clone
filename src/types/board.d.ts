type RowState = [string, string, string, string, string];

type BoardState = [RowState, RowState, RowState, RowState, RowState, RowState];

interface IBoardTile {
  children: string;
}

interface IBoardRow {
  row: RowState;
}

interface IBoard {
  selectedKey: string;
}
