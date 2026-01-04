"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Category, CreateCategoryDTO } from "@/core/entities/Category";
import Modal from "@/presentation/components/common/Modal";
import Button from "@/presentation/components/common/Button";
import { Input, Select, SelectItem } from "@heroui/react";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCategoryDTO) => Promise<void>;
  initialData?: Category | null;
  userId: string;
}

const ICONS = ["🍔", "🚌", "💰", "🎮", "🏠", "🛒", "💊", "🎓", "✈️", "🎁", "🔧", "💼", "👶", "🐾", "📉", "📈"];

const COLORS = [
  { name: "primary", label: "Primary" },
  { name: "secondary", label: "Secondary" },
  { name: "tertiary", label: "Tertiary" },
  { name: "error", label: "Error" },
];

export default function AddCategoryModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  userId,
}: AddCategoryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateCategoryDTO>({
    defaultValues: {
      name: "",
      type: "expense",
      icon: "🍔",
      color: "primary",
      userId: userId,
    },
  });

  const selectedColor = watch("color");
  const selectedIcon = watch("icon");

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          name: initialData.name,
          type: initialData.type,
          icon: initialData.icon,
          color: initialData.color,
          userId: initialData.userId,
        });
      } else {
        reset({
          name: "",
          type: "expense",
          icon: "🍔",
          color: "primary",
          userId: userId,
        });
      }
    }
  }, [isOpen, initialData, userId, reset]);

  const onFormSubmit = async (data: CreateCategoryDTO) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error("Error submitting category:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Editar Categoría" : "Nueva Categoría"}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit(onFormSubmit)} disabled={isSubmitting}>
            {isSubmitting ? "Guardando..." : initialData ? "Actualizar" : "Guardar"}
          </Button>
        </>
      }
    >
      <form className="flex flex-col gap-6 py-2">
        {/* Name Input */}
        <Input
          {...register("name", { required: "El nombre es requerido" })}
          label="Nombre"
          placeholder="Ej: Comida, Transporte"
          variant="bordered"
          radius="sm"
          errorMessage={errors.name?.message}
          isInvalid={!!errors.name}
          classNames={{
            inputWrapper: "bg-surface-container-highest",
          }}
        />

        {/* Type Selection */}
        <Select
          label="Tipo"
          placeholder="Selecciona el tipo"
          variant="bordered"
          radius="sm"
          selectedKeys={[watch("type")]}
          onChange={(e) => setValue("type", e.target.value as "income" | "expense")}
          classNames={{
            trigger: "bg-surface-container-highest",
          }}
        >
          <SelectItem key="income">Ingreso</SelectItem>
          <SelectItem key="expense">Gasto</SelectItem>
        </Select>

        {/* Icon Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-body-small text-on-surface-variant">Icono</label>
          <div className="grid grid-cols-8 gap-2">
            {ICONS.map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() => setValue("icon", icon)}
                className={`
                  h-10 w-10 rounded-full flex items-center justify-center text-xl transition-all
                  ${selectedIcon === icon 
                    ? "bg-primary-container text-on-primary-container ring-2 ring-primary" 
                    : "bg-surface-container-highest hover:bg-surface-container-high text-on-surface"}
                `}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-body-small text-on-surface-variant">Color</label>
          <div className="flex gap-4">
            {COLORS.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setValue("color", color.name)}
                className={`
                  h-12 w-12 rounded-full flex items-center justify-center transition-all
                  bg-${color.name}-container text-on-${color.name}-container
                  ${selectedColor === color.name ? "ring-2 ring-offset-2 ring-primary scale-110" : "hover:scale-105"}
                `}
                title={color.label}
              >
                <div className={`w-4 h-4 rounded-full bg-${color.name}`} />
              </button>
            ))}
          </div>
        </div>
      </form>
    </Modal>
  );
}
