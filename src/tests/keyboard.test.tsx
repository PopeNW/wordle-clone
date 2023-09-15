import { render, screen } from "@testing-library/react";
import Keyboard from "../components/keyboard";
import { keyboardRows } from "../constants";

test("should render keyboard", () => {
  const keyboardKeys = keyboardRows.flat(1);

  render(<Keyboard clickHandler={jest.fn} />);

  keyboardKeys.forEach((letter) => {
    const keyElement = screen.getByText(letter);
    expect(keyElement).toBeInTheDocument();
  });
});
