import { memo } from "react";

import { useParams } from "../../hooks/useParams";
import { Container } from "../Container";

import styled from "./Display.module.scss";

export const Display = memo((): JSX.Element => {
  const { time, error } = useParams();

  return (
    <div className={styled.display}>
      <Container className={styled.display__container}>
        <div className={styled.display__time}>
          Время выполнения: {typeof time === "number" ? `${time} мс` : ""}
        </div>
        <div className={styled.display__error}>Ошибка: {error}</div>
      </Container>
    </div>
  );
});
