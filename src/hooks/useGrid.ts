import { useCallback } from "react";

import { useParams } from "./useParams";
import { BFS } from "../utils/BFS";
import { getShortestPath } from "../utils/grid";
import { EGridCellType, TGridCell, TGridKey } from "../types";

export const useGrid = () => {
  const {
    gridState,
    isVisualized,
    setIsVisualized,
    updateCell,
    startPoint,
    setStartPoint,
    finishPoint,
    setFinishPoint,
    isMouseDown,
    setIsMouseDown,
    resetGrid,
    setTime,
    setError,
  } = useParams();

  const onClick = useCallback(
    (keyGrid: TGridKey) => {
      if (isVisualized) {
        return;
      }

      if (gridState[keyGrid].type === EGridCellType.Wall) {
        updateCell(keyGrid, EGridCellType.Default);
        return;
      }
      if (keyGrid === startPoint) {
        updateCell(keyGrid, EGridCellType.Default);
        setStartPoint(null);
        return;
      }
      if (keyGrid === finishPoint) {
        updateCell(keyGrid, EGridCellType.Default);
        setFinishPoint(null);
        return;
      }
      if (startPoint && finishPoint) {
        updateCell(keyGrid, EGridCellType.Wall);
        return;
      }
      if (!startPoint) {
        updateCell(keyGrid, EGridCellType.Start);
        setStartPoint(keyGrid);
      } else if (!finishPoint) {
        updateCell(keyGrid, EGridCellType.Finish);
        setFinishPoint(keyGrid);
      }
    },
    [gridState, startPoint, finishPoint, updateCell, isVisualized]
  );

  const onMouseEnter = useCallback(
    (keyGrid: TGridKey) => {
      if (isVisualized) return;
      if (!isMouseDown) return;
      if (keyGrid === startPoint || keyGrid === finishPoint) return;
      const currentType =
        gridState[keyGrid].type === EGridCellType.Wall
          ? EGridCellType.Default
          : EGridCellType.Wall;
      updateCell(keyGrid, currentType);
    },
    [isMouseDown, updateCell, isVisualized]
  );

  const onMouseDown = useCallback(() => {
    if (isVisualized) return;
    setIsMouseDown(true);
  }, [setIsMouseDown, isVisualized]);

  const onMouseUp = useCallback(() => {
    if (isVisualized) return;
    setIsMouseDown(false);
  }, [setIsMouseDown, isVisualized]);

  const findPath = useCallback(() => {
    if (isVisualized) {
      setError("Путь уже построен, сбросьте путь перед построением нового");
      return;
    }
    setIsVisualized(true);

    if (!startPoint || !finishPoint) {
      setError("Отметьте начальную и конечную точку");
      return;
    }

    setError(null);

    const gridCopy = JSON.parse(JSON.stringify(gridState));

    const [visitedCells, time] = BFS(gridCopy, startPoint, finishPoint);

    setTime(time);

    const updateCellWithDelay = (
      key: TGridKey,
      type: TGridCell,
      delay: number
    ) => {
      setTimeout(() => {
        updateCell(key, type);
      }, delay);
    };

    visitedCells.forEach((key) => {
      if (gridState[key].type === EGridCellType.Default) {
        updateCellWithDelay(key, EGridCellType.Visited, 200);
      }
    });

    const shortestPath = getShortestPath(gridCopy, finishPoint);

    if (shortestPath.length === 0) {
      setError("Путь не найден");
      setIsVisualized(false);
      return;
    }

    setIsVisualized(false);
    shortestPath.forEach((key) => {
      if (key !== startPoint) {
        updateCellWithDelay(key, EGridCellType.Path, 500);
      }
    });
  }, [startPoint, finishPoint, updateCell, gridState, setTime]);

  return {
    gridState,
    onClick,
    onMouseEnter,
    onMouseDown,
    onMouseUp,
    findPath,
    resetGrid,
  };
};
