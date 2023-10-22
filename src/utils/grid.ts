import { GRID_SIZE } from "../constants";
import { TGrid, EGridCellType, TGridKey } from "../types";

export const gridCompletion = () => {
  const initialGridState: TGrid = {};

  for (let rowIndex = 0; rowIndex < GRID_SIZE; rowIndex++) {
    for (let columnIndex = 0; columnIndex < GRID_SIZE; columnIndex++) {
      const key: TGridKey = `${rowIndex}-${columnIndex}`;
      initialGridState[key] = {
        type: EGridCellType.Default,
      };
    }
  }

  return initialGridState;
};

export const getShortestPath = (grid: TGrid, endKey: TGridKey): TGridKey[] => {
  const keyCells: TGridKey[] = [];
  let previousCell: TGridKey | undefined = grid[endKey].previousCell;

  while (previousCell) {
    keyCells.push(previousCell);
    previousCell = grid[previousCell].previousCell;
  }

  return keyCells;
};
