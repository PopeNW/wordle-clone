import { render, screen } from "@testing-library/react";
import { click } from "@testing-library/user-event/dist/click";
import App from "../app";

test("should render app title", () => {
  render(<App />);
  const titleElement = screen.getByText("It's Another Wordle Clone! 🤪");
  expect(titleElement).toBeInTheDocument();
});

test("should render alphabetical character in first tile on board", () => {
  render(<App />);
  const tileElement = screen.getByTestId("board-row-0-tile-0");
  const buttonElement = screen.getByText("Q", { selector: "button" });

  click(buttonElement);

  expect(tileElement).toHaveTextContent("Q");
});

test("should handle click for ENTER key", () => {});

test("should handle click for BACKSPACE key", () => {});
