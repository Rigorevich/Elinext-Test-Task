import { memo, useMemo, useCallback } from "react";
import cn from "classnames";

import {
  onClick,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
} from "../../store/thunks/gridThunk";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { EGridCellType, TGridKey } from "../../types";

import styled from "./Cell.module.scss";

export type CellProps = {
  keyGrid: TGridKey;
  className: string;
};

export const Cell = memo(({ className, keyGrid }: CellProps): JSX.Element => {
  const type = useAppSelector((state) => state.grid.grid[keyGrid].type);

  const dispatch = useAppDispatch();

  const styles: Record<string, boolean> = useMemo(
    () => ({
      [styled.cell__wall]: type === EGridCellType.Wall,
      [styled.cell__start]: type === EGridCellType.Start,
      [styled.cell__finish]: type === EGridCellType.Finish,
      [styled.cell__path]: type === EGridCellType.Path,
      [styled.cell__visited]: type === EGridCellType.Visited,
    }),
    [type]
  );

  const handleClick = useCallback(() => {
    dispatch(onClick(keyGrid));
  }, [dispatch]);

  const handleMouseEnter = useCallback(() => {
    dispatch(onMouseEnter(keyGrid));
  }, [dispatch]);

  const handleMouseDown = useCallback(() => {
    dispatch(onMouseDown());
  }, [dispatch]);

  const handleMouseUp = useCallback(() => {
    dispatch(onMouseUp());
  }, [dispatch]);

  return (
    <div
      className={cn(styled.cell, className, styles)}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
    />
  );
});
