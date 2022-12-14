import { render, screen } from "@testing-library/react";
import Board from "../components/board";

it("should render board", () => {
  const mockBoardState: BoardState = [
    [
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
    ],
    [
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
    ],
    [
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
    ],
    [
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
    ],
    [
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
    ],
    [
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
      { letter: "", isInWordle: false, isInCorrectSpot: false },
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
