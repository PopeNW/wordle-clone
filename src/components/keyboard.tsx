import styled from "styled-components";
import { keyboardRows } from "../constants";

const KeyboardWrapper = styled.div`
  display: grid;
`;

const RowWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const KeyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 3rem;
  height: 3rem;
  margin: 0.2rem;
  padding: 0 1rem;

  border: none;
  border-radius: 0.2rem;

  background-color: #d3d6da;

  font-size: 0.85rem;
  font-weight: bold;

  cursor: pointer;
`;

const Key = ({ keyboardKey, clickHandler }: KeyboardKeyProps) => {
  return (
    <KeyButton onClick={() => clickHandler(keyboardKey)}>
      {keyboardKey}
    </KeyButton>
  );
};

const Row = ({ keyboardRow, clickHandler }: KeyboardRowProps) => {
  return (
    <RowWrapper>
      {keyboardRow.map((keyboardKey, index) => (
        <Key
          key={index}
          keyboardKey={keyboardKey}
          clickHandler={clickHandler}
        />
      ))}
    </RowWrapper>
  );
};

const Keyboard = ({ clickHandler }: KeyboardProps) => {
  return (
    <KeyboardWrapper>
      {keyboardRows.map((row, index) => (
        <Row key={index} keyboardRow={row} clickHandler={clickHandler} />
      ))}
    </KeyboardWrapper>
  );
};

export default Keyboard;
