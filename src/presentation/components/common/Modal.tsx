"use client";

import { 
  Modal as HeroUIModal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Button
} from "@heroui/react";
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full";
}

export default function Modal({ 
  isOpen, 
  onClose, 
  onOpenChange,
  title, 
  children, 
  className = '',
  footer,
  size = "md"
}: ModalProps) {
  const handleOpenChange = (open: boolean) => {
    if (onOpenChange) {
      onOpenChange(open);
    } else if (!open) {
      onClose();
    }
  };

  return (
    <HeroUIModal 
      isOpen={isOpen} 
      onOpenChange={handleOpenChange}
      size={size}
      className={className}
      backdrop="blur"
      classNames={{
        base: "bg-white dark:bg-default-100",
        header: "border-b-[1px] border-gray-200",
        body: "py-6",
        footer: "border-t-[1px] border-gray-200",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {title && (
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">{title}</h2>
              </ModalHeader>
            )}
            <ModalBody>
              {children}
            </ModalBody>
            {footer && (
              <ModalFooter>
                {footer}
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </HeroUIModal>
  );
}