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

const Row = ({ row, clickHandler }: IKeyboardRow) => {
  return (
    <StyledRow>
      {row.map((keyText, index) => (
        <StyledKey key={index} onClick={() => clickHandler(keyText)}>
          {keyText}
        </StyledKey>
      ))}
    </StyledRow>
  );
};

export enum KeyboardValues {
  Q = "Q",
  W = "W",
  E = "E",
  R = "R",
  T = "T",
  Y = "Y",
  U = "U",
  I = "I",
  O = "O",
  P = "P",
  A = "A",
  S = "S",
  D = "D",
  F = "F",
  G = "G",
  H = "H",
  J = "J",
  K = "K",
  L = "L",
  Z = "Z",
  X = "X",
  C = "C",
  V = "V",
  B = "B",
  N = "N",
  M = "M",
  ENTER = "ENTER",
  BACKSPACE = "BACKSPACE",
}

const Keyboard = ({ clickHandler }: IKeyboard) => {
  const keyboardValues = [
    [
      KeyboardValues.Q,
      KeyboardValues.W,
      KeyboardValues.E,
      KeyboardValues.R,
      KeyboardValues.T,
      KeyboardValues.Y,
      KeyboardValues.U,
      KeyboardValues.I,
      KeyboardValues.O,
      KeyboardValues.P,
    ],
    [
      KeyboardValues.A,
      KeyboardValues.S,
      KeyboardValues.D,
      KeyboardValues.F,
      KeyboardValues.G,
      KeyboardValues.H,
      KeyboardValues.J,
      KeyboardValues.K,
      KeyboardValues.L,
    ],
    [
      KeyboardValues.ENTER,
      KeyboardValues.Z,
      KeyboardValues.X,
      KeyboardValues.C,
      KeyboardValues.V,
      KeyboardValues.B,
      KeyboardValues.N,
      KeyboardValues.M,
      KeyboardValues.BACKSPACE,
    ],
  ];

  return (
    <StyledKeyboardContainer>
      <StyledGrid>
        {keyboardValues.map((row, index) => (
          <Row key={index} row={row} clickHandler={clickHandler} />
        ))}
      </StyledGrid>
    </StyledKeyboardContainer>
  );
};

export default Keyboard;
