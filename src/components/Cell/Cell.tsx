import cn from "classnames";
import { memo } from "react";

import { EGridCellType, TGridCell } from "../../types";

import styled from "./Cell.module.scss";

type CellProps = {
  className?: string;
  onClick: () => void;
  type: TGridCell;
};

export const Cell = memo(
  ({ className, type, onClick }: CellProps): JSX.Element => {
    const styles: Record<string, boolean> = {
      [styled.cell__blocked]: type === EGridCellType.Blocked,
      [styled.cell__points]: type === EGridCellType.Points,
    };

    return (
      <div className={cn(styled.cell, className, styles)} onClick={onClick} />
    );
  }
);
