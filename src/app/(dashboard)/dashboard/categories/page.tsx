"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { SupabaseCategoryRepository } from "@/infraestructure/repositories/SupabaseCategoryRepository";
import { Category, CreateCategoryDTO, UpdateCategoryDTO } from "@/core/entities/Category";
import { Card, CardBody, Chip } from "@heroui/react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { FAB } from "@/presentation/components/common/FAB";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/presentation/utils/animations";
import AddCategoryModal from "@/presentation/components/categories/AddCategoryModal";
import Modal from "@/presentation/components/common/Modal";
import Button from "@/presentation/components/common/Button";

export default function CategoriesPage() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; categoryId: string | null }>({
    isOpen: false,
    categoryId: null,
  });
  
  const categoryRepository = new SupabaseCategoryRepository();

  useEffect(() => {
    if (user) {
      loadCategories();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadCategories = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await categoryRepository.getAll(user.id);
      setCategories(data);
    } catch (e) {
      console.error("Error loading categories:", e);
      // Fallback to empty array if table doesn't exist yet
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (data: CreateCategoryDTO) => {
    try {
      if (editingCategory) {
        await categoryRepository.update(editingCategory.id, data as UpdateCategoryDTO);
      } else {
        await categoryRepository.create(data);
      }
      await loadCategories();
      setIsModalOpen(false);
      setEditingCategory(null);
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDeleteCategory = async () => {
    if (!deleteConfirmation.categoryId) return;
    try {
      await categoryRepository.delete(deleteConfirmation.categoryId);
      await loadCategories();
      setDeleteConfirmation({ isOpen: false, categoryId: null });
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const openDeleteModal = (categoryId: string) => {
    setDeleteConfirmation({ isOpen: true, categoryId });
  };

  return (
    <motion.div 
      className="container mx-auto max-w-5xl p-4 pb-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header className="mb-8" variants={itemVariants}>
        <h1 className="text-display-small font-bold text-on-surface">Categorías</h1>
        <p className="text-body-large text-on-surface-variant">
          Organiza tus ingresos y gastos
        </p>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            variants={itemVariants}
            custom={index}
          >
            <Card className="bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer group">
              <CardBody className="flex flex-row items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-[16px] flex items-center justify-center text-2xl bg-${category.color}-container text-on-${category.color}-container`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-title-medium font-medium text-on-surface">{category.name}</h3>
                    <Chip size="sm" variant="flat" color={category.type === "income" ? "success" : "danger"}>
                      {category.type === "income" ? "Ingreso" : "Gasto"}
                    </Chip>
                  </div>
                </div>
                
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    isIconOnly 
                    variant="ghost" 
                    onClick={() => openEditModal(category)}
                    className="text-on-surface-variant hover:bg-surface-variant/20"
                  >
                    <Edit2 size={18} />
                  </Button>
                  <Button 
                    isIconOnly 
                    variant="ghost" 
                    onClick={() => openDeleteModal(category.id)}
                    className="text-error hover:bg-error/10"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <FAB
          variant="primary"
          size="large"
          icon={<Plus className="h-8 w-8" />}
          aria-label="Add category"
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
        />
      </motion.div>

      {user && (
        <AddCategoryModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCategory(null);
          }}
          onSubmit={handleCreateCategory}
          initialData={editingCategory}
          userId={user.id}
        />
      )}

      <Modal
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, categoryId: null })}
        title="Eliminar Categoría"
        footer={
          <>
            <Button 
              variant="ghost" 
              onClick={() => setDeleteConfirmation({ isOpen: false, categoryId: null })}
            >
              Cancelar
            </Button>
            <Button 
              className="bg-error text-on-error hover:bg-error/90"
              onClick={handleDeleteCategory}
            >
              Eliminar
            </Button>
          </>
        }
      >
        <p>¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer.</p>
      </Modal>
    </motion.div>
  );
}
