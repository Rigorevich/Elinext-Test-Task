import type { ButtonHTMLAttributes } from "react";

import styled from "./Button.module.scss";

type ButtonProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled" | "type" | "children" | "className"
>;

export const Button = ({ children, ...props }: ButtonProps): JSX.Element => {
  return (
    <button className={styled.button} {...props}>
      {children}
    </button>
  );
};
