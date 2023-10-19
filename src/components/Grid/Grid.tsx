import { useCallback } from "react";

import { Container } from "../Container";
import { Cell } from "../Cell";
import { TMode, TGrid, EMode } from "../../types";

import styled from "./Grid.module.scss";

type GridProps = {
  mode?: TMode;
  grid: TGrid;
  handleBlockedClick: (rowIndex: number, cellIndex: number) => void;
  handlePointsClick: (rowIndex: number, cellIndex: number) => void;
};

export const Grid = ({
  mode,
  grid,
  handleBlockedClick,
  handlePointsClick,
}: GridProps): JSX.Element => {
  const handleCellClick = useCallback(
    (rowIndex: number, cellIndex: number) => {
      switch (mode) {
        case EMode.Points:
          handlePointsClick(rowIndex, cellIndex);
          break;
        case EMode.Blocked:
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
