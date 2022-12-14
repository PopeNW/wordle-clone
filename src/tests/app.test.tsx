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
    it("should render character removal from first tile", () => {
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

    it("should render new character input after character removal", () => {
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

    it("should render character removals from a filled row", () => {
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
        const tileElement = screen.getByTestId(
          `board-row-0-tile-${tilePosition}`
        );
        expect(tileElement).not.toHaveTextContent(keyChar);
      });
    });
  });
});

describe("Win and lose", () => {
  describe("Letter matching on completed rows", () => {
    it("should render a green tile when letter is in the word and in the correct spot", () => {
      render(<App />);

      const keyChars = ["D", "U", "C", "K", "S"];

      keyChars.forEach((keyChar) => {
        const buttonElement = screen.getByText(keyChar, { selector: "button" });
        click(buttonElement);
      });

      const enterButtonElement = screen.getByText("ENTER", {
        selector: "button",
      });
      click(enterButtonElement);

      const tileElement = screen.getByTestId(`board-row-0-tile-0`);
      expect(tileElement).toHaveStyle({
        "background-color": "#6aaa64",
        color: "white",
      });
    });

    it('should render a yellow tile when letter is in the word but in the wrong spot', () => {
      render(<App />);

      const keyChars = ["D", "U", "C", "K", "S"];

      keyChars.forEach((keyChar) => {
        const buttonElement = screen.getByText(keyChar, { selector: "button" });
        click(buttonElement);
      });

      const enterButtonElement = screen.getByText("ENTER", {
        selector: "button",
      });
      click(enterButtonElement);

      const tileElement = screen.getByTestId(`board-row-0-tile-0`);
      expect(tileElement).toHaveStyle({
        "background-color": "#c9b458",
        color: "white",
      });
    });

    it('should render a grey tile when letter is not in the word in any spot', () => {
      render(<App />);

      const keyChars = ["D", "U", "C", "K", "S"];

      keyChars.forEach((keyChar) => {
        const buttonElement = screen.getByText(keyChar, { selector: "button" });
        click(buttonElement);
      });

      const enterButtonElement = screen.getByText("ENTER", {
        selector: "button",
      });
      click(enterButtonElement);

      const tileElement = screen.getByTestId(`board-row-0-tile-0`);
      expect(tileElement).toHaveStyle({
        "background-color": "#787c7e",
        color: "white",
      });
    });
  });
});
