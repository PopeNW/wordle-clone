import styled from "styled-components";

const KeyboardWrapper = styled.div`
  display: grid;
`;

const RowWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Key = styled.button`
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

const Row = ({ row, clickHandler }: KeyboardRowProps) => {
  return (
    <RowWrapper>
      {row.map((keyText, index) => (
        <Key key={index} onClick={() => clickHandler(keyText)}>
          {keyText}
        </Key>
      ))}
    </RowWrapper>
  );
};

const Keyboard = ({ clickHandler }: KeyboardProps) => {
  const keyboardValues = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
  ];

  return (
    <KeyboardWrapper>
      {keyboardValues.map((row, index) => (
        <Row key={index} row={row} clickHandler={clickHandler} />
      ))}
    </KeyboardWrapper>
  );
};

export default Keyboard;
