import styled from "styled-components";

const StyledBoardContainer = styled.div`
  display: flex;
  justify-content: center;

  margin: 1.7rem 0;
`;

const StyledBoard = styled.div`
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

  width: 3.7rem;
  height: 3.7rem;
  margin: 0.2rem;

  border: 0.1rem solid grey;

  font-size: 2rem;
  font-weight: bold;
`;

const Row = ({ row }: IBoardRow) => {
  return (
    <StyledRow>
      {row.map((cell, index) => (
        <StyledTile key={index}>{cell}</StyledTile>
      ))}
    </StyledRow>
  );
};

const Board = ({ boardState }: IBoard) => {
  return (
    <StyledBoardContainer>
      <StyledBoard>
        {boardState.map((row, index) => (
          <Row key={index} row={row} />
        ))}
      </StyledBoard>
    </StyledBoardContainer>
  );
};

export default Board;
