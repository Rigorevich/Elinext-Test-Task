import { createContext, useState, useCallback, ReactNode } from "react";

import { gridCompletion } from "../utils/grid";
import { TGrid, TGridCell, TGridKey } from "../types";

export type TGridContext = {
  gridState: TGrid;
  updateCell: (keyGrid: TGridKey, type: TGridCell) => void;
  resetGrid: () => void;
  startPoint: TGridKey | null;
  setStartPoint: (startPoint: TGridKey | null) => void;
  finishPoint: TGridKey | null;
  setFinishPoint: (finishPoint: TGridKey | null) => void;
  isMouseDown: boolean;
  setIsMouseDown: (isMouseDown: boolean) => void;
  time: number | null;
  error: string | null;
  setTime: (time: number) => void;
  setError: (error: string | null) => void;
  isVisualized: boolean;
  setIsVisualized: (isVisualized: boolean) => void;
};

export const GridContext = createContext<TGridContext | null>(null);

export const initialValue: TGrid = gridCompletion();

export const GridProvider = ({ children }: { children: ReactNode }) => {
  const [gridState, setGridState] = useState<TGrid>(initialValue);
  const [startPoint, setStartPoint] = useState<TGridKey | null>(null);
  const [finishPoint, setFinishPoint] = useState<TGridKey | null>(null);

  const [isVisualized, setIsVisualized] = useState<boolean>(false);

  const [time, setTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  const updateCell = useCallback(
    (keyGrid: TGridKey, type: TGridCell) => {
      setGridState((prevGrid) => {
        if (prevGrid[keyGrid].type === type) {
          return prevGrid;
        }
        return {
          ...prevGrid,
          [keyGrid]: {
            type,
          },
        };
      });
    },
    [setGridState]
  );

  const resetGrid = useCallback(() => {
    setGridState(initialValue);
    setStartPoint(null);
    setFinishPoint(null);
    setError(null);
    setTime(null);
    setIsVisualized(false);
  }, [
    setGridState,
    setStartPoint,
    setFinishPoint,
    setIsVisualized,
    setError,
    setTime,
  ]);

  return (
    <GridContext.Provider
      value={{
        isVisualized,
        setIsVisualized,
        gridState,
        updateCell,
        resetGrid,
        startPoint,
        setStartPoint,
        finishPoint,
        setFinishPoint,
        isMouseDown,
        setIsMouseDown,
        time,
        error,
        setTime,
        setError,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};
