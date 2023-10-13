import { render, screen } from "@testing-library/react";
import Keyboard from "../components/keyboard";
import { keyboardRows } from "../constants";
import { initialiseBoard } from "../utils";

const mockBoardState: BoardState = initialiseBoard();

test("should render keyboard", () => {
  const keyboardKeys = keyboardRows.flat(1);

  render(<Keyboard clickHandler={jest.fn} boardState={mockBoardState} />);

  keyboardKeys.forEach((letter) => {
    const keyElement = screen.getByText(letter);
    expect(keyElement).toBeInTheDocument();
  });
});
