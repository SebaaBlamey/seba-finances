import React, { useState, useEffect } from "react";
import Modal from "@/presentation/components/common/Modal";
import Input from "@/presentation/components/common/Input";
import Button from "@/presentation/components/common/Button";
import { CreateTransactionDTO, Transaction, UpdateTransactionDTO } from "@/core/entities/Transaction";
import { Category } from "@/core/entities/Category";
import { SupabaseCategoryRepository } from "@/infraestructure/repositories/SupabaseCategoryRepository";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { Select, SelectItem } from "@heroui/react";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CreateTransactionDTO | UpdateTransactionDTO, id?: string) => Promise<void>;
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    type: "expense" as "income" | "expense",
    date: new Date().toISOString().split("T")[0],
  });

  const categoryRepository = new SupabaseCategoryRepository();

  useEffect(() => {
    if (user && isOpen) {
      loadCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isOpen]);

  const loadCategories = async () => {
    if (!user) return;
    try {
      const data = await categoryRepository.getAll(user.id);
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e?: React.FormEvent | any) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    if (!user) return;

    setLoading(true);
    try {
      // Find the selected category object to get its type
      const selectedCategory = categories.find(c => c.name === formData.category);
      
      // Default to expense if something goes wrong, but it should be determined by category
      const transactionType = selectedCategory ? selectedCategory.type : formData.type;

      const transactionData = {
        userId: user.id,
        amount: parseFloat(formData.amount),
        description: formData.description,
        category: formData.category,
        type: transactionType,
        date: new Date(formData.date),
      };

      if (initialData) {
        await onSave(transactionData, initialData.id);
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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryName = e.target.value;
    const selectedCategory = categories.find(c => c.name === categoryName);
    
    setFormData({ 
      ...formData, 
      category: categoryName,
      // Update type immediately based on category, useful for UI feedback if needed
      type: selectedCategory ? selectedCategory.type : formData.type 
    });
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
            <Input
              label="Monto"
              type="number"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              required
              // Add visual cue for income/expense based on current derived type
              className={formData.type === 'income' ? "text-success" : "text-on-surface"}
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

        <Input
          label="Descripción"
          placeholder="Ej: Compra de supermercado"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />

        <div className="w-full">
          <Select
            label="Categoría"
            placeholder="Selecciona una categoría"
            selectedKeys={formData.category ? [formData.category] : []}
            onChange={handleCategoryChange}
            variant="flat"
            classNames={{
              trigger: "bg-surface-container-highest",
            }}
          >
            {categories.map((cat) => (
              <SelectItem key={cat.name} textValue={cat.name}>
                <div className="flex items-center justify-between w-full gap-2">
                  <div className="flex items-center gap-2">
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </div>
                  <span className={`text-tiny px-2 py-0.5 rounded-full ${
                    cat.type === 'income' 
                      ? 'bg-success/10 text-success' 
                      : 'bg-danger/10 text-danger'
                  }`}>
                    {cat.type === 'income' ? 'Ingreso' : 'Gasto'}
                  </span>
                </div>
              </SelectItem>
            ))}
          </Select>
        </div>
      </form>
    </Modal>
  );
}
