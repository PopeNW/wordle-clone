import { render, screen } from "@testing-library/react";
import Board from "../components/board";
import { TileStatus } from "../components/constants/enums";

test("should render board", () => {
  const mockBoardState: BoardState = [
    [
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
    ],
    [
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
    ],
    [
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
    ],
    [
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
    ],
    [
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
    ],
    [
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
      { letter: "", status: TileStatus.UNSET },
    ],
  ];

  render(<Board boardState={mockBoardState} />);

  mockBoardState.forEach((row, rowIndex) => {
    row.forEach((_tile, tileIndex) => {
      const tileElement = screen.getByTestId(
        `board-row-${rowIndex}-tile-${tileIndex}`
      );
      expect(tileElement).toBeInTheDocument();
    });
  });
});
