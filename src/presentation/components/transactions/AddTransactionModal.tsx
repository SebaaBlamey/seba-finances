import React, { useState, useEffect } from "react";
import Modal from "@/presentation/components/common/Modal";
import Input from "@/presentation/components/common/Input";
import Button from "@/presentation/components/common/Button";
import { CreateTransactionDTO, Transaction, UpdateTransactionDTO } from "@/core/entities/Transaction";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { Select, SelectItem } from "@heroui/react";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateTransactionDTO | UpdateTransactionDTO) => Promise<void>;
  initialData?: Transaction | null;
}

export default function AddTransactionModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: AddTransactionModalProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    type: "expense" as "income" | "expense",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        amount: initialData.amount.toString(),
        description: initialData.description,
        category: initialData.category,
        type: initialData.type,
        date: new Date(initialData.date).toISOString().split("T")[0],
      });
    } else {
      setFormData({
        amount: "",
        description: "",
        category: "",
        type: "expense",
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const transactionData = {
        userId: user.id,
        amount: parseFloat(formData.amount),
        description: formData.description,
        category: formData.category,
        type: formData.type,
        date: new Date(formData.date),
      };

      if (initialData) {
        await onSave({ ...transactionData, id: initialData.id } as UpdateTransactionDTO);
      } else {
        await onSave(transactionData);
      }
      
      onClose();
      if (!initialData) {
        setFormData({
          amount: "",
          description: "",
          category: "",
          type: "expense",
          date: new Date().toISOString().split("T")[0],
        });
      }
    } catch (error) {
      console.error("Error saving transaction:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Editar Transacción" : "Nueva Transacción"}
      size="md"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Select
              label="Tipo"
              selectedKeys={[formData.type]}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value as "income" | "expense" })
              }
              variant="flat"
              classNames={{
                trigger: "bg-surface-container-highest",
              }}
            >
              <SelectItem key="income">
                Ingreso
              </SelectItem>
              <SelectItem key="expense">
                Gasto
              </SelectItem>
            </Select>
          </div>
          <div className="flex-1">
            <Input
              label="Monto"
              type="number"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              required
            />
          </div>
        </div>

        <Input
          label="Descripción"
          placeholder="Ej: Compra de supermercado"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />

        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              label="Categoría"
              placeholder="Ej: Comida"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              required
            />
          </div>
          <div className="flex-1">
            <Input
              label="Fecha"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}
