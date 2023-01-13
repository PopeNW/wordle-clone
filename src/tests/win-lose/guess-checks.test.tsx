import { render, screen } from "@testing-library/react";
import { selectCharacters, selectEnter } from "../helpers/keyboard-input";
import App from "../../app";
import colours from "../../constants/colours";

test("should render a green tile when letter is in the word and in the correct spot", () => {
  render(<App />);

  selectCharacters(["D", "U", "C", "K", "S"]);
  selectEnter();

  const tileElement = screen.getByTestId(`board-row-0-tile-0`);
  expect(tileElement).toHaveStyle({
    "background-color": colours.green,
    color: colours.white,
  });
});

test("should render a yellow tile when letter is in the word but in the wrong spot", () => {
  render(<App />);

  selectCharacters(["U", "N", "D", "E", "R"]);
  selectEnter();

  const tileElement = screen.getByTestId(`board-row-0-tile-0`);
  expect(tileElement).toHaveStyle({
    "background-color": colours.orange,
    color: colours.white,
  });
});

test("should render a grey tile when letter is not in the word in any spot", () => {
  render(<App />);

  selectCharacters(["G", "O", "O", "S", "E"]);
  selectEnter();

  const tileElement = screen.getByTestId(`board-row-0-tile-0`);
  expect(tileElement).toHaveStyle({
    "background-color": colours.grey,
    color: colours.white,
  });
});

test("should render a grey tile if the same letter is already in the correct spot", () => {
  render(<App />);

  selectCharacters(["S", "O", "C", "K", "S"]);
  selectEnter();

  const tileElement = screen.getByTestId(`board-row-0-tile-0`);
  expect(tileElement).toHaveStyle({
    "background-color": colours.grey,
    color: colours.white,
  });
});
