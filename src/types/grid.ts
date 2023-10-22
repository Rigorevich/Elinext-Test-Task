export enum EGridCellType {
  Wall = "wall",
  Start = "start",
  Finish = "finish",
  Path = "path",
  Visited = "visited",
  Default = "default",
}

export type TGridCell =
  | EGridCellType.Wall
  | EGridCellType.Start
  | EGridCellType.Finish
  | EGridCellType.Path
  | EGridCellType.Visited
  | EGridCellType.Default;

export type TGridKey = `${number}-${number}`;

export type TGrid = {
  [key: TGridKey]: {
    type: TGridCell;
    previousCell?: TGridKey;
  };
};
