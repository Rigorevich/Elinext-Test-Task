import { useState, useEffect, useCallback } from "react";

import { gridCompletion } from "../utils/grid";
import { TGrid, TPoints, EGridCellType } from "../types";

export const useGrid = () => {
  const [grid, setGrid] = useState<TGrid>({});
  const [points, setPoints] = useState<TPoints>({
    start: [],
    end: [],
  });

  useEffect(() => {
    const initialGridState = gridCompletion();
    setGrid(initialGridState);
  }, []);

  const updateCell = useCallback(
    (rowIndex: number, columnIndex: number, type: EGridCellType) => {
      const cellKey = `${rowIndex}-${columnIndex}`;
      setGrid((prevGrid) => ({
        ...prevGrid,
        [cellKey]: {
          type,
        },
      }));
    },
    [setGrid]
  );

  const handleBlockedClick = useCallback(
    (rowIndex: number, cellIndex: number) => {
      updateCell(rowIndex, cellIndex, EGridCellType.Blocked);
    },
    []
  );

  // const handlePointsClick = useCallback(
  //   (rowIndex: number, cellIndex: number) => {
  //     setPoints((prevPoints) => {
  //       const newPoints = { ...prevPoints };

  //       if (newPoints.start.length === 0) {
  //         newPoints.start = [rowIndex, cellIndex];
  //       } else if (newPoints.end.length === 0) {
  //         newPoints.end = [rowIndex, cellIndex];
  //       } else {
  //         if (
  //           newPoints.start[0] === rowIndex &&
  //           newPoints.start[1] === cellIndex
  //         ) {
  //           return newPoints;
  //         }

  //         const newGrid = [...grid];
  //         newGrid[newPoints.end[0]][newPoints.end[1]].isPoints = false;
  //         newPoints.end = [rowIndex, cellIndex];
  //         setGrid(newGrid);
  //       }

  //       const newGrid = [...grid];
  //       newGrid[rowIndex][cellIndex].isPoints = true;
  //       setGrid(newGrid);
  //       return newPoints;
  //     });
  //   },
  //   [grid, setGrid, setPoints]
  // );

  const handlePointsClick = useCallback(() => {}, []);

  const handleClearClick = useCallback(() => {
    const newGrid = gridCompletion();
    setGrid(newGrid);
    setPoints({
      start: [],
      end: [],
    });
  }, [setGrid, setPoints]);

  const handleRouteClick = useCallback(() => {
    if (points.start.length === 0 || points.end.length === 0) {
      alert("Начальная и конечная точки не выбраны");
      return;
    }
  }, [points]);

  return {
    grid,
    points,
    handleBlockedClick,
    handleClearClick,
    handleRouteClick,
    handlePointsClick,
  };
};
