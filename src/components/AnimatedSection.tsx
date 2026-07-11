import type { ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "header";
  id?: string;
}

export function AnimatedSection({ children, className, delay = 0, as = "div", id }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const Tag = as as "div";
  return (
    <Tag
      id={id}
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className,
      )}
    >
      {children}
    </Tag>
  );
}