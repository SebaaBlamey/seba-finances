"use client";

import React from "react";
import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave";
}

export default function Skeleton({
  className = "",
  variant = "text",
  width,
  height,
  animation = "pulse",
}: SkeletonProps) {
  const baseClasses = "bg-surface-variant/30 dark:bg-surface-variant/20";
  
  const variantClasses = {
    text: "rounded-md",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  const defaultSizes = {
    text: { width: "100%", height: "1.2em" },
    circular: { width: "40px", height: "40px" },
    rectangular: { width: "100%", height: "200px" },
  };

  const pulseAnimation = {
    opacity: [0.4, 0.8, 0.4],
  };

  const waveAnimation = {
    backgroundPosition: ["-200% 0", "200% 0"],
  };

  const animationProps = animation === "pulse" 
    ? {
        animate: pulseAnimation,
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut" as const
        }
      }
    : {
        animate: waveAnimation,
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "linear" as const
        },
        style: {
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
          backgroundSize: "200% 100%",
        }
      };

  const finalWidth = width || defaultSizes[variant].width;
  const finalHeight = height || defaultSizes[variant].height;

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{
        width: finalWidth,
        height: finalHeight,
      }}
      {...animationProps}
    />
  );
}

// Preset components for common use cases
export function SkeletonText({ 
  lines = 1, 
  className = "",
  lastLineWidth = "75%"
}: { 
  lines?: number; 
  className?: string;
  lastLineWidth?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? lastLineWidth : "100%"}
          height="1.2em"
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`p-6 bg-surface-container-low rounded-[16px] space-y-4 ${className}`}>
      <div className="flex items-center space-x-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="60%" height="1.25em" />
          <Skeleton variant="text" width="40%" height="1em" />
        </div>
      </div>
      <SkeletonText lines={2} />
    </div>
  );
}