import { TileStatus } from "../constants/enums";

const initialiseBoard = (): BoardState =>
  [...Array(6)].map((_row: RowState) =>
    [...Array(5)].map((_tile: TileState) => ({
      letter: "",
      status: TileStatus.UNSET,
    }))
  );

export { initialiseBoard };
