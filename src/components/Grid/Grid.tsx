import { useState, useEffect } from "react";

import { Container } from "../Container";
import { Cell } from "../Cell";
import type { TMode } from "../../App";

import styled from "./Grid.module.scss";

export type TGridCell = {
  isBlocked: boolean;
  isStart: boolean;
  isEnd: boolean;
};

export type TGrid = TGridCell[][];

export const Grid = ({ mode }: { mode: TMode }): JSX.Element => {
  const [grid, setGrid] = useState<TGrid>([]);

  useEffect(() => {
    const newGrid: TGrid = [];
    for (let i = 0; i < 20; i++) {
      const row = [];
      for (let j = 0; j < 20; j++) {
        row.push({ isBlocked: false, isStart: false, isEnd: false });
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  }, []);

  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    switch (mode) {
      case "start":
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];
          newGrid[rowIndex][cellIndex].isStart = true;
          return newGrid;
        });
        break;
      case "end":
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];
          newGrid[rowIndex][cellIndex].isEnd = true;
          return newGrid;
        });
        break;
      case "blocked":
        setGrid((prevGrid) => {
          const newGrid = [...prevGrid];
          newGrid[rowIndex][cellIndex].isBlocked = true;
          return newGrid;
        });
    }
  };

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
