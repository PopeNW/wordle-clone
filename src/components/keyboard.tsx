import styled from "styled-components";
// import { useEffect } from "react";

const KeyboardWrapper = styled.div`
  display: grid;
`;

const RowWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const KeyWrapper = styled.button`
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
  // useEffect(() => document.addEventListener("keydown", keyDownHandler, true));

  // const keyDownHandler = (e: KeyboardEvent) =>
  //   e.code === keyboardKey.code && clickHandler(keyboardKey.key);

  return (
    <KeyWrapper onClick={() => clickHandler(keyboardKey.key)}>
      {keyboardKey.key}
    </KeyWrapper>
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
  const keyboardValues = [
    [
      { key: "Q", code: "KeyQ" },
      { key: "W", code: "KeyW" },
      { key: "E", code: "KeyE" },
      { key: "R", code: "KeyR" },
      { key: "T", code: "KeyT" },
      { key: "Y", code: "KeyY" },
      { key: "U", code: "KeyU" },
      { key: "I", code: "KeyI" },
      { key: "O", code: "KeyO" },
      { key: "P", code: "KeyP" },
    ],
    [
      { key: "A", code: "KeyA" },
      { key: "S", code: "KeyS" },
      { key: "D", code: "KeyD" },
      { key: "F", code: "KeyF" },
      { key: "G", code: "KeyG" },
      { key: "H", code: "KeyH" },
      { key: "J", code: "KeyJ" },
      { key: "K", code: "KeyK" },
      { key: "L", code: "KeyL" },
    ],
    [
      { key: "ENTER", code: "Enter" },
      { key: "Z", code: "KeyZ" },
      { key: "X", code: "KeyX" },
      { key: "C", code: "KeyC" },
      { key: "V", code: "KeyV" },
      { key: "B", code: "KeyB" },
      { key: "N", code: "KeyN" },
      { key: "M", code: "KeyM" },
      { key: "BACKSPACE", code: "Backspace" },
    ],
  ];

  return (
    <KeyboardWrapper>
      {keyboardValues.map((row, index) => (
        <Row key={index} keyboardRow={row} clickHandler={clickHandler} />
      ))}
    </KeyboardWrapper>
  );
};

export default Keyboard;
