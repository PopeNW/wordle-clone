import React, { useState } from "react";
import styled from "styled-components";

const StyledGridContainer = styled.div`
  display: flex;
`;

const StyledGrid = styled.div`
  display: grid;
`;

const StyledRow = styled.div`
  grid: row;
`;

interface ITile {
  children: string;
}

interface IRow {
  rowState: string[];
}

const Tile = ({ children }: ITile) => {
  return <div>{children}</div>;
};

const Row = ({ rowState }: IRow) => {
  return (
    <StyledRow>
      {rowState.map((tileContent, i) => (
        <Tile key={i}>{tileContent}</Tile>
      ))}
    </StyledRow>
  );
};

const WordleGrid = () => {
  const [row, setRow] = useState(["1", "2", "3", "4", "5"]);

  return (
    <StyledGridContainer>
      <StyledGrid>
        <p>Wordle grid</p>
        <Row rowState={row} />
      </StyledGrid>
    </StyledGridContainer>
  );
};

export default WordleGrid;
