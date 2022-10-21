import React, { useState } from "react";
import styled from "styled-components";

type RowState = [string, string, string, string, string];

type GridState = [RowState, RowState, RowState, RowState, RowState, RowState];

interface ICell {
  children: string;
}

interface IRow {
  rowState: RowState;
}

const StyledGridContainer = styled.div`
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

const Cell = ({ children }: ICell) => {
  return <StyledCell>{children}</StyledCell>;
};

const Row = ({ rowState }: IRow) => {
  return (
    <StyledRow>
      {rowState.map((cell, index) => (
        <Cell key={index}>{cell}</Cell>
      ))}
    </StyledRow>
  );
};

const WordleGrid = () => {
  // Use state for each cell to avoid re-rendering entire grid
  const [grid, setGrid] = useState<GridState>([
    ["G", "O", "O", "S", "E"],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  return (
    <StyledGridContainer>
      <StyledGrid>
        <p>Wordle Grid</p>
        {grid.map((row, index) => (
          <Row key={index} rowState={row} />
        ))}
      </StyledGrid>
    </StyledGridContainer>
  );
};

export default WordleGrid;
