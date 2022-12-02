import { render, screen } from "@testing-library/react";
import Board from "../components/board";

test("should render empty board", () => {
  const mockBoardState: BoardState = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ];
  render(<Board boardState={mockBoardState} />);

  mockBoardState.forEach((row, rowIndex) => {
    row.forEach((_tile, tileIndex) => {
      const tileElement = screen.getByTestId(
        `board-row-${rowIndex}-tile-${tileIndex}`
      );
      expect(tileElement).toBeInTheDocument();
      expect(tileElement).toBeEmptyDOMElement();
    });
  });
});
