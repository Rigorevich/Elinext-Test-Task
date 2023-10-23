import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { gridCompletion } from "../../utils/grid";
import type { TGrid, TGridKey, TGridCell } from "../../types";
import type { RootState } from "../store";

export type GridStore = {
  grid: TGrid;
  startPoint: TGridKey | null;
  finishPoint: TGridKey | null;
  isMouseDown: boolean;
  inProgress: boolean;
  time: number | null;
  error: string | null;
};

const initialGridState: TGrid = gridCompletion();

const initialState: GridStore = {
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
    setInProgress: (state, action: PayloadAction<GridStore["inProgress"]>) => {
      state.inProgress = action.payload;
    },
    setTime: (state, action: PayloadAction<GridStore["time"]>) => {
      state.time = action.payload;
    },
    setError: (state, action: PayloadAction<GridStore["error"]>) => {
      state.error = action.payload;
    },
    setIsMouseDown: (
      state,
      action: PayloadAction<GridStore["isMouseDown"]>
    ) => {
      state.isMouseDown = action.payload;
    },
    setStartPoint: (state, action: PayloadAction<GridStore["startPoint"]>) => {
      state.startPoint = action.payload;
    },
    setFinishPoint: (
      state,
      action: PayloadAction<GridStore["finishPoint"]>
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
} = gridSlice.actions;

export const selectGrid = (state: RootState) => state.grid;

export default gridSlice.reducer;
