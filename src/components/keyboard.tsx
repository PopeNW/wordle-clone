import React from "react";
import styled from "styled-components";

const StyledKeyboardContainer = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 1rem;
`;

const StyledGrid = styled.div`
  display: grid;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledKey = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: 3rem;
  height: 3rem;
  margin: 0.2rem;
  padding: 0 1rem;

  border: none;
  border-radius: 0.2rem;

  background-color: lightgrey;

  font-size: 1rem;
  font-weight: bold;

  cursor: pointer;
`;

const Row = ({ row }: IKeyboardRow) => {
  return (
    <StyledRow>
      {row.map((key, i) => (
        <StyledKey key={i}>{key}</StyledKey>
      ))}
    </StyledRow>
  );
};

const Keyboard = () => {
  const keyboardText = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
  ];

  return (
    <StyledKeyboardContainer>
      <StyledGrid>
        {keyboardText.map((row, i) => (
          <Row key={i} row={row} />
        ))}
      </StyledGrid>
    </StyledKeyboardContainer>
  );
};

export default Keyboard;
