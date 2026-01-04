"use client";

import { Spinner } from "@heroui/react";

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  color?: "current" | "white" | "default" | "primary" | "secondary" | "success" | "warning" | "danger";
}

export default function LoadingSpinner({ 
  size = 'medium', 
  className = '',
  color = "primary"
}: LoadingSpinnerProps) {
  const heroUISize = size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md';
  
  // Map custom colors to HeroUI supported colors for labelColor
  const getLabelColor = () => {
    if (color === "current" || color === "white" || color === "default") return "foreground";
    return color;
  };

  return (
    <Spinner 
      size={heroUISize}
      color={color}
      className={className}
      label="Cargando..."
      labelColor={getLabelColor()}
    />
  );
}
