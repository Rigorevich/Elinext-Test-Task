import cn from "classnames";

import type { TGridCell } from "../Grid";

import styled from "./Cell.module.scss";

type CellProps = {
  className?: string;
  onClick: () => void;
  cell: TGridCell;
};

export const Cell = ({ className, cell, onClick }: CellProps): JSX.Element => {
  const { isBlocked, isEnd, isStart } = cell;

  const styles: Record<string, TGridCell[keyof TGridCell]> = {
    [styled.cell__blocked]: isBlocked,
    [styled.cell__end]: isEnd,
    [styled.cell__start]: isStart,
  };

  return (
    <div className={cn(styled.cell, className, styles)} onClick={onClick} />
  );
};
