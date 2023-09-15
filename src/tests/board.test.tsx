import { render, screen } from "@testing-library/react";
import Board from "../components/board";
import { initialiseBoard } from "../utils";

test("should render board", () => {
  const mockBoardState: BoardState = initialiseBoard();

  render(<Board boardState={mockBoardState} />);

  mockBoardState.forEach((row, rowIndex) => {
    row.forEach((_tile, tileIndex) => {
      const tileElement = screen.getByTestId(
        `board-row-${rowIndex}-tile-${tileIndex}`,
      );
      expect(tileElement).toBeInTheDocument();
    });
  });
});
