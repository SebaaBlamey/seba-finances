"use client";

import {
  Button as HeroUIButton,
  ButtonProps as HeroUIButtonProps,
} from "@heroui/react";
import { ReactNode } from "react";

interface ButtonProps extends Omit<HeroUIButtonProps, "variant"> {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "danger" | "ghost";
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
  const getHeroUIProps = () => {
    switch (variant) {
      case "primary":
        return { variant: "solid" as const, color: "primary" as const };
      case "secondary":
        return { variant: "flat" as const, color: "secondary" as const };
      case "tertiary":
        return { variant: "light" as const, color: "primary" as const };
      case "danger":
        return { variant: "solid" as const, color: "danger" as const };
      case "ghost":
        return { variant: "bordered" as const, color: "default" as const };
      default:
        return { variant: "solid" as const, color: "primary" as const };
    }
  };

  const { variant: heroUIVariant, color } = getHeroUIProps();

  return (
    <HeroUIButton
      type={type}
      onPress={onClick ? () => onClick() : undefined}
      isDisabled={disabled}
      variant={heroUIVariant}
      color={color}
      className={`font-medium tracking-wide ${className}`}
      radius="full" // M3 uses full radius for buttons
      size="lg"
      {...props}
    >
      {children}
    </HeroUIButton>
  );
}
