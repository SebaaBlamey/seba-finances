"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/react";
import Skeleton, { SkeletonText } from "./Skeleton";

export function CategoryCardSkeleton() {
  return (
    <Card className="bg-surface-container-low dark:bg-dark-surface-container-low">
      <CardBody className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Skeleton
            variant="rectangular"
            width={48}
            height={48}
            className="rounded-[16px]"
          />
          <div className="space-y-2">
            <Skeleton variant="text" width="120px" height="1.25em" />
            <Skeleton
              variant="text"
              width="80px"
              height="1em"
              className="rounded-full"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
        </div>
      </CardBody>
    </Card>
  );
}

export function TransactionItemSkeleton() {
  return (
    <Card className="bg-surface-container-low dark:bg-dark-surface-container-low">
      <CardBody className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center gap-4 flex-1">
          <Skeleton variant="circular" width={40} height={40} />

          <div className="flex-1 space-y-1">
            <Skeleton variant="text" width="70%" height="1.1em" />
            <div className="flex gap-4">
              <Skeleton variant="text" width="60px" height="0.9em" />
              <Skeleton variant="text" width="80px" height="0.9em" />
            </div>
          </div>
        </div>

        <div className="text-right space-y-1">
          <Skeleton variant="text" width="80px" height="1.2em" />
          <div className="flex gap-1 justify-end">
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="circular" width={32} height={32} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export function CategoriesGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.1,
            duration: 0.3,
            ease: "easeOut",
          }}
        >
          <CategoryCardSkeleton />
        </motion.div>
      ))}
    </div>
  );
}

export function TransactionsListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: index * 0.05,
            duration: 0.3,
            ease: "easeOut",
          }}
        >
          <TransactionItemSkeleton />
        </motion.div>
      ))}
    </div>
  );
}

export function LoadingSpinner({
  size = "md",
  className = "",
  label = "Cargando...",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <motion.div
        className={`border-2 border-primary/20 dark:border-dark-primary/20 border-t-primary dark:border-t-dark-primary rounded-full ${sizeClasses[size]}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      {label && (
        <p className="text-body-medium text-on-surface-variant dark:text-dark-on-surface-variant">
          {label}
        </p>
      )}
    </div>
  );
}

export function ShimmerLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          translateX: ["100%", "100%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
