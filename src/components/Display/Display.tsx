import { Container } from "../Container";

import styled from "./Display.module.scss";

export const Display = (): JSX.Element => {
  return (
    <div className={styled.display}>
      <Container className={styled.display__container}>
        <div className={styled.display__time}>Время выполнения: </div>
        <div className={styled.display__error}>Ошибка: </div>
        <div className={styled.display__hint}>Подсказка: </div>
      </Container>
    </div>
  );
};
