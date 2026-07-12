"use client";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const Tag = as as "div";

  const shouldAnimate = isDesktop;
  const isVisible = shouldAnimate ? inView : true;

  return (
    <Tag
      id={id}
      ref={ref}
      style={{ transitionDelay: shouldAnimate ? `${delay}ms` : "0ms" }}
      className={cn(
        shouldAnimate && "transition-all duration-700 ease-out will-change-transform",
        shouldAnimate
          ? (isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")
          : "opacity-100 translate-y-0",
        className,
      )}
    >
      {children}
    </Tag>
  );
}