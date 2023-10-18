import { Container } from "../Container";

import styled from "./Controls.module.scss";

export const Controls = (): JSX.Element => {
  return (
    <div className={styled.controls}>
      <Container className={styled.controls__container}>Controls</Container>
    </div>
  );
};
