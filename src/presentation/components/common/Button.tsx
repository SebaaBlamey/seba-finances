"use client";

import { Button as HeroUIButton, ButtonProps as HeroUIButtonProps } from "@heroui/react";
import { ReactNode } from "react";

interface ButtonProps extends Omit<HeroUIButtonProps, 'variant'> {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
  className = "",
  ...props
}: ButtonProps) {
  const heroUIVariant = variant === "primary" ? "solid" : "bordered";
  const color = variant === "primary" ? "primary" : "primary";
  
  return (
    <HeroUIButton
      type={type}
      onPress={onClick}
      isDisabled={disabled}
      variant={heroUIVariant}
      color={color}
      className={className}
      radius="lg"
      size="lg"
      {...props}
    >
      {children}
    </HeroUIButton>
  );
}
