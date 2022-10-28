import { useEffect, useState } from "react";
import styled from "styled-components";

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

const StyledTile = styled.div`
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

const Tile = ({ children }: IBoardTile) => {
  const [state, setState] = useState<string>();

  useEffect(() => {
    setState(children);
  }, [children]);

  return <StyledTile>{state}</StyledTile>;
};

const Row = ({ row }: IBoardRow) => {
  return (
    <StyledRow>
      {row.map((cell, index) => (
        <Tile key={index}>{cell}</Tile>
      ))}
    </StyledRow>
  );
};

const Board = () => {
  const grid: BoardState = [
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
