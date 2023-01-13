import { render, screen } from "@testing-library/react";
import { selectCharacters } from "../helpers/keyboard-input";
import App from "../../app";

test("should render characters in first row tiles in the correct order", () => {
  render(<App />);

  const chars = ["Q", "W", "E", "R", "T"];

  chars.forEach((char, index) => {
    selectCharacters([char]);

    const tileElement = screen.getByTestId(`board-row-0-tile-${index}`);
    expect(tileElement).toHaveTextContent(char);
  });
});
