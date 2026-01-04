import React from "react";
import { cn } from "@heroui/react";
import { Plus } from "lucide-react";

interface FABProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "surface";
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
  label?: string;
  extended?: boolean;
}

export const FAB = React.forwardRef<HTMLButtonElement, FABProps>(
  (
    {
      className,
      variant = "primary",
      size = "medium",
      icon = <Plus />,
      label,
      extended = false,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-primary-container text-on-primary-container hover:bg-primary-container/90 shadow-md hover:shadow-lg",
      secondary:
        "bg-secondary-container text-on-secondary-container hover:bg-secondary-container/90 shadow-md hover:shadow-lg",
      tertiary:
        "bg-tertiary-container text-on-tertiary-container hover:bg-tertiary-container/90 shadow-md hover:shadow-lg",
      surface:
        "bg-surface-container-high text-primary hover:bg-surface-container-highest shadow-md hover:shadow-lg",
    };

    const sizes = {
      small: "h-10 w-10 rounded-[12px]",
      medium: "h-14 w-14 rounded-[16px]",
      large: "h-24 w-24 rounded-[28px]",
    };

    const extendedStyles = extended
      ? "w-auto px-4 rounded-[16px] h-14 gap-2"
      : sizes[size];

    return (
      <button
        ref={ref}
        className={cn(
          "flex items-center justify-center transition-all duration-300 active:scale-95",
          variants[variant],
          extendedStyles,
          className
        )}
        {...props}
      >
        <span className={cn("flex items-center justify-center", extended ? "h-6 w-6" : "")}>
            {icon}
        </span>
        {extended && label && (
          <span className="text-label-large font-medium">{label}</span>
        )}
      </button>
    );
  }
);

FAB.displayName = "FAB";
