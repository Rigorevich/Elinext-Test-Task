import { useCallback, useEffect } from "react";

import { GRID_SIZE } from "../../constants";
import { Container } from "../Container";
import { Cell } from "../Cell";
import { TMode, TGrid, EMode } from "../../types";

import styled from "./Grid.module.scss";

type GridProps = {
  mode?: TMode;
  grid: TGrid;
  handleBlockedClick: (rowIndex: number, columnIndex: number) => void;
  handlePointsClick: (rowIndex: number, cellIndex: number) => void;
};

export const Grid = ({
  mode,
  grid,
  handleBlockedClick,
  handlePointsClick,
}: GridProps): JSX.Element => {
  const handleCellClick = useCallback(
    (rowIndex: number, columnIndex: number) => {
      switch (mode) {
        case EMode.Points:
          handlePointsClick(rowIndex, columnIndex);
          break;
        case EMode.Blocked:
          handleBlockedClick(rowIndex, columnIndex);
          break;
        default:
          return;
      }
    },
    [handlePointsClick, handleBlockedClick, mode]
  );

  return (
    <div className={styled.grid}>
      <Container className={styled.grid__container}>
        {Object.keys(grid).length > 0 &&
          Array.from({ length: GRID_SIZE }).map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className={styled.grid__row}>
              {Array.from({ length: GRID_SIZE }).map((_, columnIndex) => (
                <Cell
                  key={`cell-${rowIndex}-${columnIndex}`}
                  className={styled.grid__cell}
                  type={grid[`${rowIndex}-${columnIndex}`].type}
                  onClick={() => handleCellClick(rowIndex, columnIndex)}
                />
              ))}
            </div>
          ))}
      </Container>
    </div>
  );
};
