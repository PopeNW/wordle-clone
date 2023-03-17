import { render, screen } from "@testing-library/react";
import { selectCharacters, selectBackspace } from "../helpers/keyboard-input";
import App from "../../app";

test("should render character removal from first tile", () => {
  render(<App wordle="DUCKS" />);

  selectCharacters(["Q"]);
  selectBackspace();

  const tileElement = screen.getByTestId("board-row-0-tile-0");
  expect(tileElement).not.toHaveTextContent("Q");
});

test("should render new character input after character removal", () => {
  render(<App wordle="DUCKS" />);

  const char = "Q";

  selectCharacters([char]);
  selectBackspace();
  selectCharacters([char]);

  const tileElement = screen.getByTestId("board-row-0-tile-0");
  expect(tileElement).toHaveTextContent(char);
});

test("should render character removals from a filled row in the correct order", () => {
  render(<App wordle="DUCKS" />);

  const chars = ["Q", "W", "E", "R", "T"];
  selectCharacters(chars);

  chars.reverse().forEach((char, index, array) => {
    selectBackspace();

    const tilePosition = array.length - 1 - index;
    const tileElement = screen.getByTestId(`board-row-0-tile-${tilePosition}`);
    expect(tileElement).not.toHaveTextContent(char);
  });
});
