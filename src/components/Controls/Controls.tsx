import { memo, useCallback } from "react";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { findPath } from "../../store/thunks/gridThunk";
import { resetGrid, resetPath } from "../../store/slices/gridSlice";
import { Container } from "../Container";
import { Button } from "../Button";

import styled from "./Controls.module.scss";

export const Controls = memo((): JSX.Element => {
  const inProgress = useAppSelector((state) => state.grid.inProgress);
  const time = useAppSelector((state) => state.grid.time);

  const dispatch = useAppDispatch();

  const handleReset = useCallback(() => {
    dispatch(resetGrid());
  }, [dispatch]);

  const handleFindPath = useCallback(() => {
    dispatch(findPath());
  }, [dispatch]);

  const handleResetPath = useCallback(() => {
    dispatch(resetPath());
  }, [dispatch]);

  return (
    <div className={styled.controls}>
      <Container className={styled.controls__container}>
        <Button
          disabled={inProgress || typeof time === "number"}
          onClick={handleFindPath}
        >
          Построить маршрут
        </Button>
        <Button
          typeStyle="secondary"
          disabled={inProgress}
          onClick={handleReset}
        >
          Сбросить
        </Button>
        <Button
          typeStyle="tertiary"
          disabled={inProgress}
          onClick={handleResetPath}
        >
          Сбросить расчет
        </Button>
      </Container>
    </div>
  );
});
