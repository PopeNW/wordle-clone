import styled from "styled-components";
import { TileStatus } from "./constants/enums";
import { WHITE, GREEN, ORANGE, GREY } from "./constants/colours";

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

const StyledTile = styled.div<TileProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 2rem;
  font-weight: bold;

  width: 3.7rem;
  height: 3.7rem;
  margin: 0.2rem;

  border: 2px solid ${(props) => (props.children ? "#878a8c" : "#d3d6da")};

  ${(props) => {
    switch (props.status) {
      case TileStatus.CORRECT_SPOT:
        return `background-color: ${GREEN}; color: ${WHITE}`;
      case TileStatus.WRONG_SPOT:
        return `background-color: ${ORANGE}; color: ${WHITE}`;
      case TileStatus.NOT_IN_WORD:
        return `background-color: ${GREY}; color: ${WHITE}`;
      default:
        return `background-color: ${WHITE}`;
    }
  }}
`;

const Board = ({ boardState }: BoardProps) => {
  return (
    <StyledBoardContainer>
      <StyledBoard data-testid="board">
        {boardState.map((row, rowIndex) => (
          <StyledRow key={rowIndex} data-testid={`board-row-${rowIndex}`}>
            {row.map((tile, tileIndex) => (
              <StyledTile
                key={tileIndex}
                data-testid={`board-row-${rowIndex}-tile-${tileIndex}`}
                status={tile.status}
              >
                {tile.letter}
              </StyledTile>
            ))}
          </StyledRow>
        ))}
      </StyledBoard>
    </StyledBoardContainer>
  );
};

export default Board;
