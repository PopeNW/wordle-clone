import { render, screen } from "@testing-library/react";
import Keyboard from "../components/keyboard";

test("renders virtual keyboard", () => {
  const keyboardValues = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "ENTER",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "BACKSPACE",
  ];

  render(<Keyboard clickHandler={jest.fn} />);

  keyboardValues.forEach((key) => {
    const keyElement = screen.getByText(key);
    expect(keyElement).toBeInTheDocument();
  });
});
