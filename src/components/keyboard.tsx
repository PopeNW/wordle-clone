import styled from "styled-components";
import { colours, keyboardRows, TileStatus } from "../constants";
import { useEffect, useState } from "react";

const KeyboardWrapper = styled.div`
  display: grid;
`;

const RowWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const KeyButton = styled.button<KeyButtonProps>`
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

  ${(props) => {
    switch (props.keyState) {
      case TileStatus.CORRECT_SPOT:
        return `background-color: ${colours.green}; color: ${colours.white};`;
      case TileStatus.WRONG_SPOT:
        return `background-color: ${colours.yellow}; color: ${colours.white};`;
      case TileStatus.NOT_IN_WORD:
        return `background-color: ${colours.grey}; color: ${colours.white};`;
      default:
        return;
    }
  }}
`;

const Key = ({ keyboardKey, clickHandler, keyState }: KeyboardKeyProps) => {
  return (
    <KeyButton onClick={() => clickHandler(keyboardKey)} keyState={keyState}>
      {keyboardKey}
    </KeyButton>
  );
};

const Row = ({ keyboardRow, clickHandler, keyStates }: KeyboardRowProps) => {
  return (
    <RowWrapper>
      {keyboardRow.map((keyboardKey, index) => (
        <Key
          key={index}
          keyboardKey={keyboardKey}
          clickHandler={clickHandler}
          keyState={keyStates[keyboardKey]}
        />
      ))}
    </RowWrapper>
  );
};

const Keyboard = ({ clickHandler, boardState }: KeyboardProps) => {
  let keyStates: KeyStates = {};

  boardState.forEach((rowState) => {
    rowState.forEach((keyState) => {
      if (!keyState.letter) return;
      if (!(keyState.letter in keyStates)) {
        keyStates = {
          ...keyStates,
          [keyState.letter]: keyState.status,
        };
      }

      for (const [key, value] of Object.entries(keyStates)) {
        if (keyState.letter === key) {
          if (keyState.status > value) {
            keyStates = { ...keyStates, [key]: keyState.status };
          }
        }
      }
    });
  });

  return (
    <KeyboardWrapper>
      {keyboardRows.map((row, index) => (
        <Row
          key={index}
          keyboardRow={row}
          clickHandler={clickHandler}
          keyStates={keyStates}
        />
      ))}
    </KeyboardWrapper>
  );
};

export default Keyboard;
