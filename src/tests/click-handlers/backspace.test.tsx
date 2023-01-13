import { render, screen } from "@testing-library/react";
import { click } from "@testing-library/user-event/dist/click";
import App from "../../-app";

test("should render character removal from first tile", () => {
  render(<App />);

  const charButtonElement = screen.getByText("Q", { selector: "button" });
  click(charButtonElement);

  const backspaceButtonElement = screen.getByText("BACKSPACE", {
    selector: "button",
  });
  click(backspaceButtonElement);

  const tileElement = screen.getByTestId("board-row-0-tile-0");
  expect(tileElement).not.toHaveTextContent("Q");
});

test("should render new character input after character removal", () => {
  render(<App />);

  const charButtonElement = screen.getByText("Q", { selector: "button" });
  click(charButtonElement);

  const backspaceButtonElement = screen.getByText("BACKSPACE", {
    selector: "button",
  });
  click(backspaceButtonElement);

  click(charButtonElement);

  const tileElement = screen.getByTestId("board-row-0-tile-0");
  expect(tileElement).toHaveTextContent("Q");
});

test("should render character removals from a filled row", () => {
  render(<App />);

  const keyChars = ["Q", "W", "E", "R", "T"];

  keyChars.forEach((keyChar) => {
    const charButtonElement = screen.getByText(keyChar, {
      selector: "button",
    });
    click(charButtonElement);
  });

  keyChars.reverse().forEach((keyChar, index, array) => {
    const backspaceButtonElement = screen.getByText("BACKSPACE", {
      selector: "button",
    });
    click(backspaceButtonElement);

    const tilePosition = array.length - 1 - index;
    const tileElement = screen.getByTestId(`board-row-0-tile-${tilePosition}`);
    expect(tileElement).not.toHaveTextContent(keyChar);
  });
});
