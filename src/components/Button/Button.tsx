import cn from "classnames";
import { memo, ButtonHTMLAttributes } from "react";

import styled from "./Button.module.scss";

type NativeButton = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "disabled" | "children" | "className" | "onClick"
>;

type ButtonProps = {
  typeStyle?: "primary" | "secondary";
} & NativeButton;

export const Button = memo(
  ({ children, typeStyle = "primary", ...props }: ButtonProps): JSX.Element => {
    return (
      <button
        className={cn(styled.button, props.className, {
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
