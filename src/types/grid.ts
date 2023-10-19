export enum EGridCellType {
  Blocked = "blocked",
  Points = "points",
  None = "none",
}

export type TGridCell =
  | EGridCellType.Blocked
  | EGridCellType.Points
  | EGridCellType.None;

export type TGrid = {
  [key: string]: {
    type: TGridCell;
  };
};
