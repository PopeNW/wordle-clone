import { render, screen } from "@testing-library/react";
import { selectCharacters, selectEnter } from "../helpers/keyboard-input";
import App from "../../app";
import colours from "../../constants/colours";

test("should render a green tile when letter is in the word and in the correct spot", () => {
  render(<App wordle="DUCKS" />);

  selectCharacters(["D", "U", "C", "K", "S"]);
  selectEnter();

  const tileElement = screen.getByTestId(`board-row-0-tile-0`);
  expect(tileElement).toHaveStyle({
    "background-color": colours.green,
    color: colours.white,
  });
});

test("should render a yellow tile when letter is in the word but in the wrong spot", () => {
  render(<App wordle="DUCKS" />);

  selectCharacters(["U", "N", "D", "E", "R"]);
  selectEnter();

  const tileElement = screen.getByTestId(`board-row-0-tile-0`);
  expect(tileElement).toHaveStyle({
    "background-color": colours.orange,
    color: colours.white,
  });
});

test("renders a grey tile if letter is not in the word", () => {
  render(<App wordle="DUCKS" />);

  selectCharacters(["G", "O", "O", "S", "E"]);
  selectEnter();

  const tileElement = screen.getByTestId(`board-row-0-tile-0`);
  expect(tileElement).toHaveStyle({
    "background-color": colours.grey,
    color: colours.white,
  });
});

test("renders a grey tile if the same letter is already in the correct spot", () => {
  render(<App wordle="DUCKS" />);

  selectCharacters(["S", "O", "C", "K", "S"]);
  selectEnter();

  const tileElement = screen.getByTestId(`board-row-0-tile-0`);
  expect(tileElement).toHaveStyle({
    "background-color": colours.grey,
    color: colours.white,
  });
});

test("renders a yellow tile if a letter is in the wrong spot and the same letter is in the correct spot", () => {
  render(<App wordle="GOOSE" />);

  selectCharacters(["O", "Z", "O", "N", "E"]);
  selectEnter();

  const wrongLetterTile = screen.getByTestId(`board-row-0-tile-0`);
  expect(wrongLetterTile).toHaveStyle({
    "background-color": colours.orange,
    color: colours.white,
  });

  const correctLetterTile = screen.getByTestId(`board-row-0-tile-2`);
  expect(correctLetterTile).toHaveStyle({
    "background-color": colours.green,
    color: colours.white,
  });
});
