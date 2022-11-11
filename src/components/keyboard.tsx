import styled from "styled-components";

const StyledKeyboardContainer = styled.div`
  display: flex;
  justify-content: center;
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

  font-size: 0.85rem;
  font-weight: bold;

  cursor: pointer;
`;

const Row = ({ row, setSelectedKey }: IKeyboardRow) => {
  return (
    <StyledRow>
      {row.map((keyText, index) => (
        <StyledKey key={index} onClick={() => setSelectedKey(keyText)}>
          {keyText}
        </StyledKey>
      ))}
    </StyledRow>
  );
};

const Keyboard = ({ setSelectedKey }: IKeyboard) => {
  const keyboardText = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
  ];

  return (
    <StyledKeyboardContainer>
      <StyledGrid>
        {keyboardText.map((row, index) => (
          <Row key={index} row={row} setSelectedKey={setSelectedKey} />
        ))}
      </StyledGrid>
    </StyledKeyboardContainer>
  );
};

export default Keyboard;
