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

  border: 2px solid;
  border-color: ${(props) => (props.children ? "#878a8c" : "#d3d6da")};

  font-size: 2rem;
  font-weight: bold;
`;

const Board = ({ boardState }: IBoard) => {
  return (
    <StyledBoardContainer>
      <StyledBoard data-testid="board">
        {boardState.map((row, rowIndex) => (
          <StyledRow key={rowIndex} data-testid={`board-row-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
              <StyledTile
                key={cellIndex}
                data-testid={`board-row-${rowIndex}-tile-${cellIndex}`}
              >
                {cell}
              </StyledTile>
            ))}
          </StyledRow>
        ))}
      </StyledBoard>
    </StyledBoardContainer>
  );
};

export default Board;
