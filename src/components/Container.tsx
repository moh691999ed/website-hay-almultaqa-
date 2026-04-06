import type { JSX, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

export function Container({
  children,
  className,
  as: Comp = "div",
}: ContainerProps) {
  return <Comp className={cn("container-page", className)}>{children}</Comp>;
}

