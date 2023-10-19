import cn from "classNames";

import type { ButtonHTMLAttributes } from "react";

import styled from "./Button.module.scss";

type ButtonProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled" | "type" | "children" | "className" | "onClick"
> & {
  active?: boolean;
};

export const Button = ({
  children,
  active,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={cn(styled.button, props.className, {
        [styled.active]: active,
      })}
      {...props}
    >
      {children}
    </button>
  );
};
