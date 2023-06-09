import { render, screen } from "@testing-library/react";
import { selectCharacters, selectEnter } from "../helpers/keyboard-input";
import App from "../../app";

test("game ends with win when guessing correct word", () => {
  render(<App wordle="DUCKS" />);

  selectCharacters(["D", "U", "C", "K", "S"]);
  selectEnter();

  // Expect game over modal with win
});

test("should handle a game loss when player runs out of guesses", () => {
  render(<App wordle="GOOSE" />);

  for (let i = 0; i < 6; i++) {
    selectCharacters(["D", "U", "C", "K", "S"]);
    selectEnter();
  }

  // Expect game over modal with loss
});
