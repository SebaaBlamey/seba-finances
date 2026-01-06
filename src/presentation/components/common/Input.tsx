"use client";

import {
  Input as HeroUIInput,
  InputProps as HeroUIInputProps,
} from "@heroui/react";
import { forwardRef } from "react";

interface InputProps extends Omit<HeroUIInputProps, "onChange"> {
  type?: "text" | "email" | "password" | "number" | "date";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      placeholder,
      value,
      onChange,
      disabled,
      required,
      className = "",
      label,
      error,
      ...props
    },
    ref,
  ) => {
    return (
      <HeroUIInput
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        isDisabled={disabled}
        isRequired={required}
        className={className}
        label={label}
        errorMessage={error}
        isInvalid={!!error}
        variant="flat"
        radius="sm"
        size="lg"
        labelPlacement="inside"
        classNames={{
          inputWrapper:
            "bg-surface-variant/30 data-[hover=true]:bg-surface-variant/50 group-data-[focus=true]:bg-surface-variant/50",
          label: "text-on-surface-variant",
          input: "text-on-surface",
        }}
        color={error ? "danger" : "primary"}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
