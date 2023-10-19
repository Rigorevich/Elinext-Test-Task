import { GRID_SIZE } from "../constants";
import { TGrid, EGridCellType } from "../types/grid";

export const gridCompletion = () => {
  const initialGridState: TGrid = {};

  for (let rowIndex = 0; rowIndex < GRID_SIZE; rowIndex++) {
    for (let columnIndex = 0; columnIndex < GRID_SIZE; columnIndex++) {
      const cellKey = `${rowIndex}-${columnIndex}`;
      initialGridState[cellKey] = {
        type: EGridCellType.None,
      };
    }
  }

  return initialGridState;
};
