import { Container } from "../Container";
import { Button } from "../Button";

import styled from "./Controls.module.scss";

export const Controls = (): JSX.Element => {
  return (
    <div className={styled.controls}>
      <Container className={styled.controls__container}>
        <Button>Начать</Button>
        <Button>Сбросить</Button>
        <Button>Начать</Button>
      </Container>
    </div>
  );
};
