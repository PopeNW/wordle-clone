import { render, screen } from "@testing-library/react";
import { click } from "@testing-library/user-event/dist/click";
import App from "../../app";

test("should render characters on next row when clicking ENTER button on a filled row", () => {
  render(<App />);

  const keyChars = ["Q", "W", "E", "R", "T"];

  keyChars.forEach((keyChar) => {
    const buttonElement = screen.getByText(keyChar, { selector: "button" });
    click(buttonElement);
  });

  const enterButtonElement = screen.getByText("ENTER", {
    selector: "button",
  });
  click(enterButtonElement);

  keyChars.forEach((keyChar, index) => {
    const buttonElement = screen.getByText(keyChar, { selector: "button" });
    click(buttonElement);

    const tileElement = screen.getByTestId(`board-row-1-tile-${index}`);
    expect(tileElement).toHaveTextContent(keyChar);
  });
});

test("should not render characters on next row when clicking ENTER button on an unfilled row", () => {
  render(<App />);

  const enterButtonElement = screen.getByText("ENTER", {
    selector: "button",
  });
  click(enterButtonElement);

  const charButtonElement = screen.getByText("Q", { selector: "button" });
  click(charButtonElement);

  const tileElement = screen.getByTestId("board-row-1-tile-0");
  expect(tileElement).not.toHaveTextContent("Q");
});
