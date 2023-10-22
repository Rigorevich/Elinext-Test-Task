import { Container } from "../Container";
import { Button } from "../Button";
import { useGrid, useParams } from "../../hooks";

import styled from "./Controls.module.scss";

export const Controls = (): JSX.Element => {
  const { findPath, resetGrid } = useGrid();
  const { time, isVisualized } = useParams();

  return (
    <div className={styled.controls}>
      <Container className={styled.controls__container}>
        <Button
          typeStyle="secondary"
          onClick={findPath}
          disabled={isVisualized || typeof time === "number"}
        >
          Построить маршрут
        </Button>
        <Button onClick={resetGrid} disabled={isVisualized}>
          Сбросить
        </Button>
      </Container>
    </div>
  );
};
