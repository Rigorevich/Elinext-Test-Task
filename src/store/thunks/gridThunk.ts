import { Dispatch } from "@reduxjs/toolkit";

import { PATH_DELAY } from "../../constants";
import { TGridKey, TGridCell, EGridCellType } from "../../types";
import { BFS, getShortestPath } from "../../utils";
import { RootState } from "../store";
import {
  updateGrid,
  setStartPoint,
  setFinishPoint,
  setIsMouseDown,
  setInProgress,
  setError,
  setTime,
} from "../slices/gridSlice";

export const onClick =
  (key: TGridKey) => (dispatch: Dispatch, getState: () => RootState) => {
    const { grid, startPoint, finishPoint, inProgress } = getState().grid;

    if (inProgress) {
      return;
    }

    let type = EGridCellType.Default;

    if (grid[key].type === EGridCellType.Wall) {
      type = EGridCellType.Default;
    } else if (key === startPoint) {
      type = EGridCellType.Default;
      dispatch(setStartPoint(null));
    } else if (key === finishPoint) {
      type = EGridCellType.Default;
      dispatch(setFinishPoint(null));
    } else if (startPoint && finishPoint) {
      type = EGridCellType.Wall;
    } else if (!startPoint) {
      type = EGridCellType.Start;
      dispatch(setStartPoint(key));
    } else if (!finishPoint) {
      type = EGridCellType.Finish;
      dispatch(setFinishPoint(key));
    }

    dispatch(updateGrid({ key, type }));
  };

export const onMouseEnter =
  (key: TGridKey) => (dispatch: Dispatch, getState: () => RootState) => {
    const { grid, startPoint, finishPoint, isMouseDown, inProgress } =
      getState().grid;

    if (
      inProgress ||
      !isMouseDown ||
      key === startPoint ||
      key === finishPoint
    ) {
      return;
    }

    const type =
      grid[key]?.type === EGridCellType.Wall
        ? EGridCellType.Default
        : EGridCellType.Wall;

    dispatch(updateGrid({ key, type }));
  };

export const onMouseDown = () => (dispatch: Dispatch) => {
  dispatch(setIsMouseDown(true));
};
export const onMouseUp = () => (dispatch: Dispatch) => {
  dispatch(setIsMouseDown(false));
};

export const findPath =
  () => (dispatch: Dispatch, getState: () => RootState) => {
    const { grid, startPoint, finishPoint } = getState().grid;

    if (!startPoint || !finishPoint) {
      dispatch(setError("Укажите начальную и конечную точку"));
      return;
    }

    dispatch(setInProgress(true));
    dispatch(setError(null));

    const gridCopy = JSON.parse(JSON.stringify(grid));

    const time = BFS(gridCopy, startPoint, finishPoint);

    dispatch(setTime(time));

    const updateCellWithDelay = async (
      key: TGridKey,
      type: TGridCell,
      delay: number
    ) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          dispatch(updateGrid({ key, type }));
          resolve();
        }, delay);
      });
    };

    const shortestPath = getShortestPath(gridCopy, finishPoint);

    if (shortestPath.length === 0) {
      dispatch(setError("Путь не найден"));
      dispatch(setInProgress(false));
      return;
    }

    (async () => {
      for (const key of shortestPath) {
        if (key === startPoint || key === finishPoint) continue;
        await updateCellWithDelay(key, EGridCellType.Path, PATH_DELAY);
      }
      dispatch(setInProgress(false));
    })();
  };
