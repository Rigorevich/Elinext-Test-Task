import type { TGrid } from "../types/grid";

export const gridCompletion = () => {
  const newGrid: TGrid = [];
  for (let i = 0; i < 20; i++) {
    const row = [];
    for (let j = 0; j < 20; j++) {
      row.push({ isBlocked: false, isPoints: false });
    }
    newGrid.push(row);
  }

  return newGrid;
};
