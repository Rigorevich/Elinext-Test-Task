import { TGrid, EGridCellType, TGridKey } from "../types";

export const BFS = (
  grid: TGrid,
  startKey: TGridKey,
  finishKey: TGridKey
): [TGridKey[], number] => {
  let startTime = performance.now();
  let endTime;

  let unvisitedCellsQueue: TGridKey[] = [startKey];
  let visitedCells: TGridKey[] = [];

  grid[startKey].type = EGridCellType.Visited;

  while (unvisitedCellsQueue.length > 0) {
    const currentKey = unvisitedCellsQueue.pop();

    if (!currentKey) {
      endTime = performance.now();
      return [visitedCells, endTime - startTime];
    }

    if (currentKey === finishKey) {
      endTime = performance.now();
      return [visitedCells, endTime - startTime];
    }

    visitedCells.push(currentKey);

    const [row, col] = currentKey.split("-").map((item) => Number(item));

    const neighbors: TGridKey[] = [
      `${row}-${col + 1}`,
      `${row - 1}-${col}`,
      `${row + 1}-${col}`,
      `${row}-${col - 1}`,
    ];

    neighbors.forEach((key) => {
      if (
        grid[key] &&
        grid[key].type !== EGridCellType.Wall &&
        grid[key].type !== EGridCellType.Visited
      ) {
        grid[key].previousCell = currentKey;
        unvisitedCellsQueue.unshift(key);
        grid[key].type = EGridCellType.Visited;
      }
    });
  }

  endTime = performance.now();
  return [visitedCells, endTime - startTime];
};
