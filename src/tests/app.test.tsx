import { render, screen } from "@testing-library/react";
import { click } from "@testing-library/user-event/dist/click";
import App from "../app";

describe("Render app", () => {
  it("should render app title", () => {
    render(<App />);
    const titleElement = screen.getByText("Wordle");
    expect(titleElement).toBeInTheDocument();
  });
});

describe("Handle clicks", () => {
  describe("Character buttons", () => {
    it("should render characters in first row tiles", () => {
      render(<App />);

      const keyChars = ["Q", "W", "E", "R", "T"];

      keyChars.forEach((keyChar, index) => {
        const buttonElement = screen.getByText(keyChar, { selector: "button" });
        click(buttonElement);

        const tileElement = screen.getByTestId(`board-row-0-tile-${index}`);
        expect(tileElement).toHaveTextContent(keyChar);
      });
    });
  });

  describe("ENTER button", () => {
    it("should render characters on next row when clicking ENTER button on a filled row", () => {
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

    it("should not render characters on next row when clicking ENTER button on an unfilled row", () => {
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
  });

  describe("BACKSPACE button", () => {
    it("should render character removal from first tile when clicking BACKSPACE button", () => {
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

    it("should render character removals from a filled row", () => {
      render(<App />);

      const keyChars = ["Q", "W", "E", "R", "T"];

      keyChars.forEach((key) => {
        const charButtonElement = screen.getByText(key, { selector: "button" });
        click(charButtonElement);
      });

      keyChars.reverse().forEach((key, index, array) => {
        const backspaceButtonElement = screen.getByText("BACKSPACE", {
          selector: "button",
        });
        click(backspaceButtonElement);

        const tilePosition = array.length - 1 - index;
        const tileElement = screen.getByTestId(
          `board-row-0-tile-${tilePosition}`
        );
        expect(tileElement).not.toHaveTextContent(key);
      });
    });
  });
});
