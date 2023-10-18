import cn from "classnames";

import styled from "./Container.module.scss";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const Container = ({
  children,
  className,
}: ContainerProps): JSX.Element => {
  return <div className={cn(styled.container, className)}>{children}</div>;
};
