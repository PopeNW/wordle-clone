import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const selectCharacters = (chars: string[]) => {
  chars.forEach((char) => {
    const buttonElement = screen.getByText(char, { selector: "button" });
    userEvent.click(buttonElement);
  });
};

const selectEnter = () => {
  const enterButtonElement = screen.getByText("ENTER", {
    selector: "button",
  });
  userEvent.click(enterButtonElement);
};

const selectBackspace = () => {
  const backspaceButtonElement = screen.getByText("BACKSPACE", {
    selector: "button",
  });
  userEvent.click(backspaceButtonElement);
};

export { selectCharacters, selectEnter, selectBackspace };
