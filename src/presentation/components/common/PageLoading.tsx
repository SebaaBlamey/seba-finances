"use client";

import React from "react";
import { motion } from "framer-motion";
import { LoadingSpinner } from "./LoadingComponents";

interface PageLoadingProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
}

export default function PageLoading({ 
  title = "Cargando...", 
  subtitle,
  showLogo = false 
}: PageLoadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8"
    >
      {showLogo && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary dark:bg-dark-primary flex items-center justify-center text-on-primary dark:text-dark-on-primary text-2xl font-bold">
            F
          </div>
        </motion.div>
      )}
      
      <LoadingSpinner size="lg" label="" />
      
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mt-6 space-y-2"
      >
        <h3 className="text-title-large font-medium text-on-surface dark:text-dark-on-surface">
          {title}
        </h3>
        {subtitle && (
          <p className="text-body-medium text-on-surface-variant dark:text-dark-on-surface-variant max-w-sm">
            {subtitle}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}