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

  const keyboardCharacters = ["Q", "W", "E", "R", "T"];
  
  keyboardCharacters.forEach((keyChar, index) => {
    const tileElement = screen.getByTestId(`board-row-0-tile-${index}`);
    const buttonElement = screen.getByText(keyChar, { selector: "button" });

    click(buttonElement);

    expect(tileElement).toHaveTextContent(keyChar);
  })
});

test("should handle click for ENTER key", () => {
  render(<App />);
});

test("should handle click for BACKSPACE key", () => {});
