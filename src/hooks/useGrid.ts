import { useState, useEffect, useCallback } from "react";

import { gridCompletion } from "../utils/grid";
import type { TGrid, TPoints } from "../types";

export const useGrid = () => {
  const [grid, setGrid] = useState<TGrid>([]);
  const [points, setPoints] = useState<TPoints>({
    start: [],
    end: [],
  });

  useEffect(() => {
    const newGrid = gridCompletion();
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

  const handleClearClick = useCallback(() => {
    const newGrid = gridCompletion();
    setGrid(newGrid);
    setPoints({
      start: [],
      end: [],
    });
  }, [setGrid, setPoints]);

  return {
    grid,
    points,
    handleBlockedClick,
    handlePointsClick,
    handleClearClick,
  };
};
