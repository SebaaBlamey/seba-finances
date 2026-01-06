"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  className = "",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full m-4 h-[calc(100%-2rem)]",
  };

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{
              duration: 0.4,
              ease: [0.2, 0.0, 0, 1.0],
            }}
            className={`
              relative w-full ${sizeClasses[size]}
              bg-white dark:bg-gray-900
              text-gray-900 dark:text-gray-100
              rounded-[28px] shadow-2xl border border-gray-200 dark:border-gray-700
              flex flex-col max-h-[90vh] overflow-hidden
              ${className}
            `}
            style={{
              backgroundColor: "var(--surface-container-high, #ECE6F0)",
              color: "var(--on-surface, #1C1B1F)",
            }}
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-4 shrink-0">
              {title && (
                <h2
                  className="text-headline-small font-normal"
                  style={{ color: "var(--on-surface, #1C1B1F)" }}
                >
                  {title}
                </h2>
              )}
              <Button
                variant="ghost"
                isIconOnly
                onClick={onClose}
                className="absolute right-4 top-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                style={{ color: "var(--on-surface-variant, #49454F)" }}
              >
                <X size={24} />
              </Button>
            </div>

            <div
              className="px-6 py-2 overflow-y-auto text-body-medium"
              style={{ color: "var(--on-surface-variant, #49454F)" }}
            >
              {children}
            </div>

            <div className="px-6 pt-4 pb-6 shrink-0 flex justify-end gap-2">
              {footer}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
