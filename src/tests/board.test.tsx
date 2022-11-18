import { render, screen } from "@testing-library/react";
import Board from "../components/board";

test("renders board", () => {
  const mockGrid: BoardState = [
    ["1", "2", "3", "4", "5"],
    ["6", "7", "8", "9", "10"],
    ["11", "12", "13", "14", "15"],
    ["16", "17", "18", "19", "20"],
    ["21", "22", "23", "24", "25"],
    ["26", "27", "28", "29", "30"],
  ];

  render(<Board grid={mockGrid} />);

  mockGrid.forEach((row) => {
    row.forEach((tile) => {
      const tileElement = screen.getByText(tile);
      expect(tileElement).toBeInTheDocument();
    });
  });
});
