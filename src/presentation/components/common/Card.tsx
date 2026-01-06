import React from "react";
import { cn } from "@heroui/react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "elevated" | "filled" | "outlined";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "elevated", ...props }, ref) => {
    const variants = {
      elevated: "bg-surface-container-low dark:bg-surface-container shadow-md dark:shadow-none",
      filled: "bg-surface-container-highest",
      outlined: "bg-surface border border-outline-variant",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[20px] p-4 transition-all duration-200",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-2", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-title-large font-medium leading-none tracking-tight text-on-surface",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-2 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-2 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";
