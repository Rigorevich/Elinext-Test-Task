import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { gridCompletion } from "../../utils/grid";
import {
  type TGrid,
  type TGridKey,
  type TGridCell,
  EGridCellType,
} from "../../types";
import type { RootState } from "../store";

export type Gridstate = {
  grid: TGrid;
  startPoint: TGridKey | null;
  finishPoint: TGridKey | null;
  isMouseDown: boolean;
  inProgress: boolean;
  time: number | null;
  error: string | null;
};

const initialGridState: TGrid = gridCompletion();

const initialState: Gridstate = {
  grid: initialGridState,
  startPoint: null,
  finishPoint: null,
  time: null,
  error: null,
  isMouseDown: false,
  inProgress: false,
};

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    updateGrid: (
      state,
      action: PayloadAction<{ key: TGridKey; type: TGridCell }>
    ) => {
      const { key, type } = action.payload;

      state.grid[key] = { type };
    },
    setInProgress: (state, action: PayloadAction<Gridstate["inProgress"]>) => {
      state.inProgress = action.payload;
    },
    setTime: (state, action: PayloadAction<Gridstate["time"]>) => {
      state.time = action.payload;
    },
    setError: (state, action: PayloadAction<Gridstate["error"]>) => {
      state.error = action.payload;
    },
    setIsMouseDown: (
      state,
      action: PayloadAction<Gridstate["isMouseDown"]>
    ) => {
      state.isMouseDown = action.payload;
    },
    setStartPoint: (state, action: PayloadAction<Gridstate["startPoint"]>) => {
      state.startPoint = action.payload;
    },
    setFinishPoint: (
      state,
      action: PayloadAction<Gridstate["finishPoint"]>
    ) => {
      state.finishPoint = action.payload;
    },
    resetGrid: (state) => {
      state.grid = initialGridState;
      state.time = null;
      state.error = null;
      state.startPoint = null;
      state.finishPoint = null;
    },
    resetPath: (state) => {
      Object.keys(state.grid).forEach((key) => {
        if (
          key === state.finishPoint ||
          key === state.startPoint ||
          state.grid[key as TGridKey].type === EGridCellType.Path
        ) {
          state.grid[key as TGridKey].type = EGridCellType.Default;
        }
      });
      state.time = null;
      state.error = null;
      state.startPoint = null;
      state.finishPoint = null;
    },
  },
});

export const {
  updateGrid,
  resetGrid,
  setStartPoint,
  setFinishPoint,
  setIsMouseDown,
  setInProgress,
  setTime,
  setError,
  resetPath,
} = gridSlice.actions;

export const selectGrid = (state: RootState) => state.grid;

export default gridSlice.reducer;
