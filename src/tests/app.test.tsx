import { render, screen } from "@testing-library/react";
import { click } from "@testing-library/user-event/dist/click";
import App from "../app";

test("should render app title", () => {
  render(<App />);
  const titleElement = screen.getByText("It's Another Wordle Clone! 🤪");
  expect(titleElement).toBeInTheDocument();
});

test("should render alphabetical characters in first row on board", () => {
  render(<App />);
  // First row tiles of board
  const tileElement1 = screen.getByTestId("board-row-0-tile-0");
  const tileElement2 = screen.getByTestId("board-row-0-tile-1");
  const tileElement3 = screen.getByTestId("board-row-0-tile-2");
  const tileElement4 = screen.getByTestId("board-row-0-tile-3");
  const tileElement5 = screen.getByTestId("board-row-0-tile-4");

  // Keyboard button elements
  const buttonElementQ = screen.getByText("Q", { selector: "button" });
  const buttonElementW = screen.getByText("W", { selector: "button" });
  const buttonElementE = screen.getByText("E", { selector: "button" });
  const buttonElementR = screen.getByText("R", { selector: "button" });
  const buttonElementT = screen.getByText("T", { selector: "button" });

  // Fill first row with alphabetical characters
  click(buttonElementQ);
  click(buttonElementW);
  click(buttonElementE);
  click(buttonElementR);
  click(buttonElementT);

  // Assert that board has rendered characters in first row tiles
  expect(tileElement1).toHaveTextContent("Q");
  expect(tileElement2).toHaveTextContent("W");
  expect(tileElement3).toHaveTextContent("E");
  expect(tileElement4).toHaveTextContent("R");
  expect(tileElement5).toHaveTextContent("T");
});

test("should handle click for ENTER key", () => {
  render(<App />);

});

test("should handle click for BACKSPACE key", () => {});
