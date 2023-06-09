import { render, screen } from "@testing-library/react";
import { selectCharacters, selectEnter } from "../helpers/keyboard-input";
import App from "../../app";
import { colours } from "../../constants";

test("Correct spot: renders green tile when letter is in correct spot", () => {
  render(<App wordle="DUCKS" />);

  selectCharacters(["D", "U", "C", "K", "S"]);
  selectEnter();

  const firstLetter = screen.getByTestId(`board-row-0-tile-0`);
  expect(firstLetter).toHaveStyle({
    "background-color": colours.green,
    color: colours.white,
  });
});

test("Not in the word: renders a grey tile when letter is not in the word", () => {
  render(<App wordle="DUCKS" />);

  selectCharacters(["G", "O", "O", "S", "E"]);
  selectEnter();

  const firstLetter = screen.getByTestId(`board-row-0-tile-0`);
  expect(firstLetter).toHaveStyle({
    "background-color": colours.grey,
    color: colours.white,
  });
});

/**
 * One letter, wrong spot (one instance of letter in word)
 * If there is a single instance of the letter 'S' in a word and the user guesses the letter 'S'
 * in the wrong spot then the 'S' in the wrong spot will be yellow.
 */
test("Wrong spot: One letter, wrong spot (one instance of letter in word)", () => {
  render(<App wordle="DUCKS" />);

  selectCharacters(["U", "N", "D", "E", "R"]);
  selectEnter();

  const firstLetter = screen.getByTestId(`board-row-0-tile-0`);
  expect(firstLetter).toHaveStyle({
    "background-color": colours.yellow,
    color: colours.white,
  });
});

/**
 * Two letters, both wrong spot (one instance of letter in word)
 * If there are two instances of the letter guessed but both are in the wrong spot,
 * and there is only one correct placement for the letter then the first wrong letter
 * will be yellow and the second will be grey (reading from left to right).
 */
test("Wrong spot: Two letters, both wrong spot (one instance of letter in word)", () => {
  render(<App wordle="GOOSE" />);

  selectCharacters(["S", "O", "C", "K", "S"]);
  selectEnter();

  const firstLetter = screen.getByTestId("board-row-0-tile-0");
  expect(firstLetter).toHaveStyle({
    "background-color": colours.yellow,
    color: colours.white,
  });

  const fifthLetter = screen.getByTestId("board-row-0-tile-4");
  expect(fifthLetter).toHaveStyle({
    "background-color": colours.grey,
    color: colours.white,
  });
});

/**
 * Two letters, one correct spot and one wrong spot (one instance of letter in word)
 * Wrong spot letter should be grey as there are no other instances of this letter in the word.
 */
test("Wrong spot: Two letters, one correct spot and one wrong spot (one instance of letter in word)", () => {
  render(<App wordle="DUCKS" />);

  selectCharacters(["S", "O", "C", "K", "S"]);
  selectEnter();

  const firstLetter = screen.getByTestId("board-row-0-tile-0");
  expect(firstLetter).toHaveStyle({
    "background-color": colours.grey,
    color: colours.white,
  });

  const fifthLetter = screen.getByTestId("board-row-0-tile-4");
  expect(fifthLetter).toHaveStyle({
    "background-color": colours.green,
    color: colours.white,
  });
});

/**
 * Two letters, both wrong spot (two instances of letter in word)
 * Both yellow as there are two available instances of this letter in the word.
 */
test("Wrong spot: Two letters, both wrong spot (two instances of letter in word)", () => {
  render(<App wordle="DONOR" />);

  selectCharacters(["O", "Z", "O", "N", "E"]);
  selectEnter();

  const firstLetter = screen.getByTestId("board-row-0-tile-0");
  expect(firstLetter).toHaveStyle({
    "background-color": colours.yellow,
    color: colours.white,
  });

  const thirdLetter = screen.getByTestId("board-row-0-tile-2");
  expect(thirdLetter).toHaveStyle({
    "background-color": colours.yellow,
    color: colours.white,
  });
});

/**
 * Two letters, one wrong and one correct spot (two instances of letter in word)
 * Wrong spot letters should be yellow as there is still an available instance of
 * this letter in the word.
 */
test("Wrong spot: Two letters, one wrong and one correct spot (two instances of letter in word)", () => {
  render(<App wordle="GOOSE" />);

  selectCharacters(["O", "Z", "O", "N", "E"]);
  selectEnter();

  const wrongLetter = screen.getByTestId(`board-row-0-tile-0`);
  expect(wrongLetter).toHaveStyle({
    "background-color": colours.yellow,
    color: colours.white,
  });

  const correctLetter = screen.getByTestId(`board-row-0-tile-2`);
  expect(correctLetter).toHaveStyle({
    "background-color": colours.green,
    color: colours.white,
  });
});
