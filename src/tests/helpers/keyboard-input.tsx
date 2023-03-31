import { fireEvent, screen } from "@testing-library/react";

const selectCharacters = (chars: string[]) => {
  chars.forEach((char) => {
    const buttonElement = screen.getByText(char, { selector: "button" });
    fireEvent.click(buttonElement);
  });
};

const selectEnter = () => {
  const enterButtonElement = screen.getByText("ENTER", {
    selector: "button",
  });
  fireEvent.click(enterButtonElement);
};

const selectBackspace = () => {
  const backspaceButtonElement = screen.getByText("BACKSPACE", {
    selector: "button",
  });
  fireEvent.click(backspaceButtonElement);
};

export { selectCharacters, selectEnter, selectBackspace };
