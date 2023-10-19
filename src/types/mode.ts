export enum EMode {
  Points = "points",
  Blocked = "blocked",
  Clear = "clear",
  Route = "route",
}

export type TMode = EMode.Points | EMode.Blocked | EMode.Clear | EMode.Route;
