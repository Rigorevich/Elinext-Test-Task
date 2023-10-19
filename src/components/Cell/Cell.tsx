import { memo, useCallback, ComponentType } from "react";
import cn from "classnames";

import { useGrid } from "../../hooks";
import { EGridCellType, TGridCell } from "../../types";

import styled from "./Cell.module.scss";

export type WithCellProps = {
  keyGrid: string;
  className: string;
};

export type CellProps = {
  className: string;
  styles: Record<string, boolean>;
  onClick: () => void;
};

export function withCell<T extends CellProps>(
  WrappedComponent: ComponentType<T>
) {
  return function WithCellComponent({ keyGrid, className }: WithCellProps) {
    const { gridState, updateCell } = useGrid();
    const type = gridState[keyGrid].type;

    const onClick = useCallback(() => {
      updateCell(keyGrid, EGridCellType.Blocked);
    }, [updateCell]);

    const styles: Record<string, boolean> = {
      [styled.cell__blocked]: type === EGridCellType.Blocked,
      [styled.cell__points]: type === EGridCellType.Points,
    };

    const combinedProps = {
      onClick,
      className,
      styles,
    } as T;

    return <WrappedComponent {...combinedProps} />;
  };
}

const Cell = memo(({ className, onClick, styles }: CellProps): JSX.Element => {
  return (
    <div className={cn(styled.cell, className, styles)} onClick={onClick} />
  );
});

export const CellHoc = withCell(Cell);
