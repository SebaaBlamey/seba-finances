"use client";

import {
  Dropdown as HeroDropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { ReactNode } from "react";

interface DropdownOption {
  key: string;
  label: string;
  onClick?: () => void;
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  className?: string;
}

interface DropdownProps {
  trigger: ReactNode;
  options: DropdownOption[];
  placement?: "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end";
  className?: string;
}

export default function Dropdown({
  trigger,
  options,
  placement = "bottom-end",
  className = "",
}: DropdownProps) {
  return (
    <HeroDropdown 
      className={className} 
      placement={placement}
      classNames={{
        content: "bg-surface p-1 border border-surface-variant/20 shadow-lg rounded-xl min-w-[200px]",
      }}
    >
      <DropdownTrigger>
        {trigger}
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Dropdown menu"
        onAction={(key) => {
          const option = options.find((opt) => opt.key === key);
          if (option?.onClick) {
            option.onClick();
          }
        }}
        itemClasses={{
          base: [
            "rounded-lg",
            "text-on-surface",
            "transition-colors",
            "data-[hover=true]:bg-surface-variant/30",
            "data-[hover=true]:text-on-surface",
          ],
        }}
      >
        {options.map((option) => (
          <DropdownItem
            key={option.key}
            color={option.color}
            className={option.className}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </HeroDropdown>
  );
}
