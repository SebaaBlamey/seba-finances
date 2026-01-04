"use client";

import { ReactNode } from "react";
import styles from "./Label.module.css";

interface LabelProps {
  children: ReactNode;
  size?: "caption2" | "caption" | "body" | "bodyLarge" | "callout";
  color?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "accent";
  weight?: "regular" | "medium" | "semibold";
  className?: string;
  as?: "span" | "div" | "p" | "label";
}

export default function Label({
  children,
  size = "body",
  color = "primary",
  weight = "regular",
  className = "",
  as: Component = "span",
}: LabelProps) {
  const combinedClassName = `${styles.label} ${styles[size]} ${styles[color]} ${styles[weight]} ${className}`.trim();

  return (
    <Component className={combinedClassName}>
      {children}
    </Component>
  );
}