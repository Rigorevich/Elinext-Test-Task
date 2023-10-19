import { Container } from "../Container";
import { Button } from "../Button";
import type { TMode } from "../../App";

import styled from "./Controls.module.scss";

type ControlsProps = {
  mode?: TMode;
  setMode: React.Dispatch<React.SetStateAction<TMode | undefined>>;
};

export const Controls = ({ mode, setMode }: ControlsProps): JSX.Element => {
  const handleClickButton = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    const currentMode = event.currentTarget.dataset.mode as TMode;
    setMode((prev) => (prev === currentMode ? undefined : currentMode));
  };

  return (
    <div className={styled.controls}>
      <Container className={styled.controls__container}>
        <Button>Построить маршрут</Button>
        <Button
          data-mode="blocked"
          active={mode === "blocked"}
          onClick={handleClickButton}
        >
          Установить препятствия
        </Button>
        <Button
          data-mode="points"
          active={mode === "points"}
          onClick={handleClickButton}
        >
          Установить начальную и конечную точки
        </Button>
      </Container>
    </div>
  );
};
