import { render, screen } from "@testing-library/react";
import Keyboard, { KeyboardValues } from "../components/keyboard";

test("renders virtual keyboard", () => {
  const keyboardValues = [
    KeyboardValues.Q,
    KeyboardValues.W,
    KeyboardValues.E,
    KeyboardValues.R,
    KeyboardValues.T,
    KeyboardValues.Y,
    KeyboardValues.U,
    KeyboardValues.I,
    KeyboardValues.O,
    KeyboardValues.P,
    KeyboardValues.A,
    KeyboardValues.S,
    KeyboardValues.D,
    KeyboardValues.F,
    KeyboardValues.G,
    KeyboardValues.H,
    KeyboardValues.J,
    KeyboardValues.K,
    KeyboardValues.L,
    KeyboardValues.ENTER,
    KeyboardValues.Z,
    KeyboardValues.X,
    KeyboardValues.C,
    KeyboardValues.V,
    KeyboardValues.B,
    KeyboardValues.N,
    KeyboardValues.M,
    KeyboardValues.BACKSPACE,
  ];

  render(<Keyboard clickHandler={jest.fn} />);

  keyboardValues.forEach((key) => {
    const keyElement = screen.getByText(key);
    expect(keyElement).toBeInTheDocument();
  });
});
