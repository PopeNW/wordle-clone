import { render, screen } from "@testing-library/react";
import { click } from "@testing-library/user-event/dist/click";
import App from "../../app";
import { WHITE, GREY, GREEN, ORANGE } from "../../components/constants/colours";

test("should render a green tile when letter is in the word and in the correct spot", () => {
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
    "background-color": GREEN,
    color: WHITE,
  });
});

test("should render a yellow tile when letter is in the word but in the wrong spot", () => {
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
    "background-color": ORANGE,
    color: WHITE,
  });
});

test("should render a grey tile when letter is not in the word in any spot", () => {
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
    "background-color": GREY,
    color: WHITE,
  });
});
