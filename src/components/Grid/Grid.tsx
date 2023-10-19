import { memo } from "react";

import { GRID_SIZE } from "../../constants";
import { Container } from "../Container";
import { CellHoc } from "../Cell";

import styled from "./Grid.module.scss";

const grid = (() => {
  const newGrid = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    const rowArray = [];
    for (let col = 0; col < GRID_SIZE; col++) {
      rowArray.push(`${row}-${col}`);
    }
    newGrid.push(rowArray);
  }
  return newGrid;
})();

export const Grid = memo((): JSX.Element => {
  return (
    <div className={styled.grid}>
      <Container className={styled.grid__container}>
        {grid.map((row, rowIndex) => {
          return (
            <div className={styled.grid__row} key={`row-${rowIndex}`}>
              {row.map((_, columnIndex) => {
                const key = `${rowIndex}-${columnIndex}`;
                return (
                  <CellHoc
                    key={key}
                    keyGrid={key}
                    className={styled.grid__cell}
                  />
                );
              })}
            </div>
          );
        })}
      </Container>
    </div>
  );
});
