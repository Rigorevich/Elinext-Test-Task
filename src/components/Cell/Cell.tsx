import { memo, useMemo, HTMLAttributes, ComponentType } from "react";
import cn from "classnames";

import { useGrid } from "../../hooks";
import { EGridCellType, TGridCell, TGridKey } from "../../types";

import styled from "./Cell.module.scss";

export type CellHocProps = {
  className: string;
  keyGrid: TGridKey;
};

export type CellProps = {
  className: string;
  type: TGridCell;
} & HTMLAttributes<HTMLDivElement>;

const withCellHOC = (Component: ComponentType<CellProps>) => {
  return memo(({ className, keyGrid }: CellHocProps) => {
    const { gridState, onClick, onMouseDown, onMouseUp, onMouseEnter } =
      useGrid();

    return (
      <Component
        type={gridState[keyGrid].type}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseEnter={() => onMouseEnter(keyGrid)}
        onClick={() => onClick(keyGrid)}
        className={className}
      />
    );
  });
};

const Cell = ({ className, type, ...rest }: CellProps): JSX.Element => {
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

  return <div className={cn(styled.cell, className, styles)} {...rest} />;
};

export const CellHOC = withCellHOC(Cell);
