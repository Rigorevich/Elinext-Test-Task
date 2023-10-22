import cn from "classnames";
import { memo } from "react";

import type { ButtonHTMLAttributes } from "react";

import styled from "./Button.module.scss";

type NativeButton = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled" | "children" | "className" | "onClick"
>;

type ButtonProps = NativeButton & {
  active?: boolean;
  typeStyle?: "primary" | "secondary";
};

export const Button = memo(
  ({
    children,
    active,
    typeStyle = "primary",
    ...props
  }: ButtonProps): JSX.Element => {
    return (
      <button
        className={cn(styled.button, props.className, {
          [styled.active]: active,
          [styled.primary]: typeStyle === "primary",
          [styled.secondary]: typeStyle === "secondary",
        })}
        {...props}
      >
        {children}
      </button>
    );
  }
);
