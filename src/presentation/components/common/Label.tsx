"use client";

import { ReactNode } from "react";

interface LabelProps {
  children: ReactNode;
  size?: "displayLarge" | "displayMedium" | "displaySmall" | "headlineLarge" | "headlineMedium" | "headlineSmall" | "titleLarge" | "titleMedium" | "titleSmall" | "labelLarge" | "labelMedium" | "labelSmall" | "bodyLarge" | "bodyMedium" | "bodySmall";
  color?: "on-surface" | "on-surface-variant" | "primary" | "secondary" | "tertiary" | "error" | "success";
  className?: string;
  as?: "span" | "div" | "p" | "label" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function Label({
  children,
  size = "bodyLarge",
  color = "on-surface",
  className = "",
  as: Component = "span",
}: LabelProps) {
  
  const sizeClasses = {
    displayLarge: "text-[57px] leading-[64px] tracking-[-0.25px]",
    displayMedium: "text-[45px] leading-[52px] tracking-[0px]",
    displaySmall: "text-[36px] leading-[44px] tracking-[0px]",
    headlineLarge: "text-[32px] leading-[40px] tracking-[0px]",
    headlineMedium: "text-[28px] leading-[36px] tracking-[0px]",
    headlineSmall: "text-[24px] leading-[32px] tracking-[0px]",
    titleLarge: "text-[22px] leading-[28px] tracking-[0px]",
    titleMedium: "text-[16px] leading-[24px] tracking-[0.15px] font-medium",
    titleSmall: "text-[14px] leading-[20px] tracking-[0.1px] font-medium",
    labelLarge: "text-[14px] leading-[20px] tracking-[0.1px] font-medium",
    labelMedium: "text-[12px] leading-[16px] tracking-[0.5px] font-medium",
    labelSmall: "text-[11px] leading-[16px] tracking-[0.5px] font-medium",
    bodyLarge: "text-[16px] leading-[24px] tracking-[0.5px]",
    bodyMedium: "text-[14px] leading-[20px] tracking-[0.25px]",
    bodySmall: "text-[12px] leading-[16px] tracking-[0.4px]",
  };

  const colorClasses = {
    "on-surface": "text-on-surface",
    "on-surface-variant": "text-on-surface-variant",
    "primary": "text-primary",
    "secondary": "text-secondary",
    "tertiary": "text-tertiary",
    "error": "text-danger",
    "success": "text-success",
  };

  const combinedClassName = `${sizeClasses[size]} ${colorClasses[color]} ${className}`.trim();

  return (
    <Component className={combinedClassName}>
      {children}
    </Component>
  );
}
