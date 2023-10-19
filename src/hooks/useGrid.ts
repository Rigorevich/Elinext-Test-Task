import { useState, useEffect, useCallback } from "react";

import type { TGrid, TPoints } from "../components/Grid/Grid";

export const useGrid = () => {
  const [grid, setGrid] = useState<TGrid>([]);
  const [points, setPoints] = useState<TPoints>({
    start: [],
    end: [],
  });

  useEffect(() => {
    const newGrid: TGrid = [];
    for (let i = 0; i < 20; i++) {
      const row = [];
      for (let j = 0; j < 20; j++) {
        row.push({ isBlocked: false, isPoints: false });
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  }, []);

  const handleBlockedClick = useCallback(
    (rowIndex: number, cellIndex: number) => {
      const newGrid = [...grid];
      newGrid[rowIndex][cellIndex].isBlocked = true;
      setGrid(newGrid);
    },
    [grid, setGrid]
  );

  const handlePointsClick = useCallback(
    (rowIndex: number, cellIndex: number) => {
      setPoints((prevPoints) => {
        const newPoints = { ...prevPoints };

        if (newPoints.start.length === 0) {
          newPoints.start = [rowIndex, cellIndex];
        } else if (newPoints.end.length === 0) {
          newPoints.end = [rowIndex, cellIndex];
        } else {
          if (
            newPoints.start[0] === rowIndex &&
            newPoints.start[1] === cellIndex
          ) {
            return newPoints;
          }

          const newGrid = [...grid];
          newGrid[newPoints.end[0]][newPoints.end[1]].isPoints = false;
          newPoints.end = [rowIndex, cellIndex];
          setGrid(newGrid);
        }

        const newGrid = [...grid];
        newGrid[rowIndex][cellIndex].isPoints = true;
        setGrid(newGrid);
        return newPoints;
      });
    },
    [grid, setGrid, setPoints]
  );

  return {
    grid,
    points,
    handleBlockedClick,
    handlePointsClick,
  };
};
