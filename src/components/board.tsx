import { useEffect, useState } from "react";
import styled from "styled-components";

type RowState = [string, string, string, string, string];

type GridState = [RowState, RowState, RowState, RowState, RowState, RowState];

interface ITile {
  children: string;
}

interface IRow {
  row: RowState;
}

const StyledGridContainer = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 2rem;
`;

const StyledGrid = styled.div`
  display: grid;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 3.5rem;
  height: 3.5rem;
  margin: 0.2rem;

  border: 0.1rem solid grey;

  font-size: 2rem;
  font-weight: bold;
`;

const Tile = ({ children }: ITile) => {
  const [state, setState] = useState<string>();

  useEffect(() => {
    setState(children);
  }, [children]);

  return <StyledCell>{state}</StyledCell>;
};

const Row = ({ row }: IRow) => {
  return (
    <StyledRow>
      {row.map((cell, index) => (
        <Tile key={index}>{cell}</Tile>
      ))}
    </StyledRow>
  );
};

const Board = () => {
  const grid: GridState = [
    ["G", "O", "O", "S", "E"],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ];

  return (
    <StyledGridContainer>
      <StyledGrid>
        {grid.map((row, index) => (
          <Row key={index} row={row} />
        ))}
      </StyledGrid>
    </StyledGridContainer>
  );
};

export default Board;
