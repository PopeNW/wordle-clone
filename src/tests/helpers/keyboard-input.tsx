import { screen } from "@testing-library/react";
import { click } from "@testing-library/user-event/dist/click";

const selectCharacters = (chars: string[]) => {
  chars.forEach((char) => {
    const buttonElement = screen.getByText(char, { selector: "button" });
    click(buttonElement);
  });
};

const selectEnter = () => {
  const enterButtonElement = screen.getByText("ENTER", {
    selector: "button",
  });
  click(enterButtonElement);
};

const selectBackspace = () => {
  const backspaceButtonElement = screen.getByText("BACKSPACE", {
    selector: "button",
  });
  click(backspaceButtonElement);
};

export { selectCharacters, selectEnter, selectBackspace };
