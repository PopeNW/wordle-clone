import { render, screen } from "@testing-library/react";
import { click } from "@testing-library/user-event/dist/click";
import App from "../../-app";

test("should render characters in first row tiles", () => {
  render(<App />);

  const keyChars = ["Q", "W", "E", "R", "T"];

  keyChars.forEach((keyChar, index) => {
    const buttonElement = screen.getByText(keyChar, { selector: "button" });
    click(buttonElement);

    const tileElement = screen.getByTestId(`board-row-0-tile-${index}`);
    expect(tileElement).toHaveTextContent(keyChar);
  });
});
