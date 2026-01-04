"use client";

import {
  Modal as HeroUIModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
  backdrop?: "transparent" | "opaque" | "blur";
}

export default function Modal({
  isOpen,
  onClose,
  onOpenChange,
  title,
  children,
  className = "",
  footer,
  backdrop = "blur",
  size = "md",
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
      backdrop={backdrop}
      radius="lg" // M3 uses large radius for dialogs (28px usually, but lg is close)
      classNames={{
        base: "bg-surface-container-high dark:bg-surface-container-high shadow-xl",
        header: "border-b-0 pb-2",
        body: "py-4",
        footer: "border-t-0 pt-2",
        closeButton: "hover:bg-surface-variant/20 active:bg-surface-variant/30",
      }}
      motionProps={{
        variants: {
          enter: {
            scale: 1,
            opacity: 1,
            transition: {
              duration: 0.4,
              ease: [0.2, 0.0, 0, 1.0], // M3 Standard Easing
            },
          },
          exit: {
            scale: 0.95,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: [0.2, 0.0, 0, 1.0],
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            {title && (
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl font-normal text-on-surface">{title}</h2>
              </ModalHeader>
            )}
            <ModalBody className="text-on-surface-variant">{children}</ModalBody>
            {footer && <ModalFooter>{footer}</ModalFooter>}
          </>
        )}
      </ModalContent>
    </HeroUIModal>
  );
}
