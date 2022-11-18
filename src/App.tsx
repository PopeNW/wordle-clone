import { useEffect, useState } from "react";
import styled from "styled-components";
import Keyboard from "./components/keyboard";
import Board from "./components/board";

const StyledApp = styled.div`
  display: block;
`;

const StyledHeader = styled.header`
  display: flex;
  background-color: #2d468c;
  padding: 1rem;
`;

const StyledTitle = styled.h1`
  color: #eeeeee;
  margin: 0 auto;
`;

const App = () => {
  const [grid, setGrid] = useState<BoardState>([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [selectedKey, setSelectedKey] = useState("");
  const [, setGridPosition] = useState<GridPosition>([0, 0]);

  useEffect(() => {
    if (selectedKey === "BACKSPACE") {
      // Clear current tile text and go back one column in row if able
      setGridPosition((p) => {
        setGrid((g) => {
          const newGrid: BoardState = [...g];
          newGrid[p[0]][p[1]] = "";

          return newGrid;
        });

        if (p[1] > 0) {
          return [p[0], p[1] - 1];
        }

        return p;
      });
    } else if (selectedKey === "ENTER") {
      // Set final state for current row and move to the next row
      setGridPosition((p) => [p[0] + 1, 0]);
    } else if (selectedKey !== "") {
      // Set the current tile text to selected key if it's not already set on the last column
      setGridPosition((p) => {
        setGrid((g) => {
          const newGrid: BoardState = [...g];

          if (newGrid[p[0]][p[1]] === "") {
            newGrid[p[0]][p[1]] = selectedKey;
          }

          return newGrid;
        });

        if (p[1] < 4) {
          return [p[0], p[1] + 1];
        }

        return p;
      });
    }
  }, [selectedKey]);

  return (
    <StyledApp>
      <StyledHeader>
        <StyledTitle>It's Another Wordle Clone! 🤪</StyledTitle>
      </StyledHeader>
      <Board grid={grid} />
      <Keyboard setSelectedKey={setSelectedKey} />
    </StyledApp>
  );
};

export default App;
