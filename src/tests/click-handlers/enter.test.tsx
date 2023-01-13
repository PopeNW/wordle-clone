import { render, screen } from "@testing-library/react";
import { selectCharacters, selectEnter } from "../helpers/keyboard-input";
import App from "../../app";

test("should render characters on next row when clicking ENTER button on a filled row", () => {
  render(<App />);

  const chars = ["Q", "W", "E", "R", "T"];

  selectCharacters(chars);
  selectEnter();
  selectCharacters(chars);

  chars.forEach((char, index) => {
    const tileElement = screen.getByTestId(`board-row-1-tile-${index}`);
    expect(tileElement).toHaveTextContent(char);
  });
});

test("should not render characters on next row when clicking ENTER button on an unfilled row", () => {
  render(<App />);

  const char = "Q";

  selectEnter();
  selectCharacters([char]);

  const tileElement = screen.getByTestId("board-row-1-tile-0");
  expect(tileElement).not.toHaveTextContent(char);
});
