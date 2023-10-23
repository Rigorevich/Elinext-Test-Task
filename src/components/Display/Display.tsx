import { memo } from "react";

import { Container } from "../Container";

import styled from "./Display.module.scss";
import { useAppSelector } from "../../store/hooks";

export const Display = memo((): JSX.Element => {
  const time = useAppSelector((state) => state.grid.time);
  const error = useAppSelector((state) => state.grid.error);

  return (
    <div className={styled.display}>
      <Container className={styled.display__container}>
        <div className={styled.display__wrapper}>
          <div className={styled.display__time}>
            Время выполнения: {time && `${time} мс`}
          </div>
          <div className={styled.display__error}>
            Ошибка: <span>{error}</span>
          </div>
        </div>
      </Container>
    </div>
  );
});
