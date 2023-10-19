import { useCallback } from "react";

import { Container } from "../Container";
import { Cell } from "../Cell";
import { useGrid } from "../../hooks";
import type { TMode } from "../../App";

import styled from "./Grid.module.scss";

export type TGridCell = {
  isBlocked: boolean;
  isPoints: boolean;
};

export type TGrid = TGridCell[][];

export type TPoints = {
  start: number[];
  end: number[];
};

export const Grid = ({ mode }: { mode?: TMode }): JSX.Element => {
  const { grid, handleBlockedClick, handlePointsClick } = useGrid();

  const handleCellClick = useCallback(
    (rowIndex: number, cellIndex: number) => {
      switch (mode) {
        case "points":
          handlePointsClick(rowIndex, cellIndex);
          break;
        case "blocked":
          handleBlockedClick(rowIndex, cellIndex);
          break;
        default:
          return;
      }
    },
    [mode]
  );

  return (
    <div className={styled.grid}>
      <Container className={styled.grid__container}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className={styled.grid__row}>
            {row.map((cell, cellIndex) => (
              <Cell
                key={cellIndex}
                className={styled.grid__cell}
                cell={cell}
                onClick={() => handleCellClick(rowIndex, cellIndex)}
              />
            ))}
          </div>
        ))}
      </Container>
    </div>
  );
};
