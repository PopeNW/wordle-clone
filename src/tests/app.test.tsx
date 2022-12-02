import { render, screen } from "@testing-library/react";
import { click } from "@testing-library/user-event/dist/click";
import App from "../app";

test("should render app title", () => {
  render(<App />);
  const titleElement = screen.getByText("Wordle");
  expect(titleElement).toBeInTheDocument();
});

test("should render alphabetical characters in first row on board", () => {
  render(<App />);

  const keyChars = ["Q", "W", "E", "R", "T"];
  keyChars.forEach((keyChar, index) => {
    const buttonElement = screen.getByText(keyChar, { selector: "button" });
    click(buttonElement);

    const tileElement = screen.getByTestId(`board-row-0-tile-${index}`);
    expect(tileElement).toHaveTextContent(keyChar);
  });
});

test("should render characters on next row when clicking ENTER button on a filled row", () => {
  render(<App />);

  const firstRowKeyChars = ["Q", "W", "E", "R", "T"];
  firstRowKeyChars.forEach((keyChar) => {
    const buttonElement = screen.getByText(keyChar, { selector: "button" });
    click(buttonElement);
  });

  const enterButtonElement = screen.getByText("ENTER", { selector: "button" });
  click(enterButtonElement);

  const secondRowKeyChars = ["Y", "U", "I", "O", "P"];
  secondRowKeyChars.forEach((keyChar, index) => {
    const buttonElement = screen.getByText(keyChar, { selector: "button" });
    click(buttonElement);

    const tileElement = screen.getByTestId(`board-row-1-tile-${index}`);
    expect(tileElement).toHaveTextContent(keyChar);
  });
});

test("should not render characters on next row when clicking ENTER button on an unfilled row", () => {
  render(<App />);

  const enterButtonElement = screen.getByText("ENTER", { selector: "button" });
  click(enterButtonElement);

  const buttonElement = screen.getByText("Q", { selector: "button" });
  click(buttonElement);

  const tileElement = screen.getByTestId("board-row-1-tile-0");
  expect(tileElement).not.toHaveTextContent("Q");
});

test("should handle click for BACKSPACE key", () => {});
