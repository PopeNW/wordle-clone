import React from "react";
import styled from "styled-components";

const StyledGridContainer = styled.div`
  display: flex;
`;

const StyledGrid = styled.div`
  display: grid;
`;

interface IProps {
  children: string;
}

const Tile = ({ children }: IProps) => {
  return <div>{children}</div>;
};

const Row = (): React.ReactElement[] => {
  const rowStateArray = ["", "", "", "", ""];
  return rowStateArray.map((tileContent, i) => (
    <Tile key={i}>{tileContent}</Tile>
  ));
};

const WordleGrid = () => {
  return (
    <StyledGridContainer>
      <StyledGrid>
        <p>Wordle grid</p>
        {/* <Row /> */}
      </StyledGrid>
    </StyledGridContainer>
  );
};

export default WordleGrid;
