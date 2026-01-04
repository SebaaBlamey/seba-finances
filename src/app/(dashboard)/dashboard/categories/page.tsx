"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { SupabaseCategoryRepository } from "@/infraestructure/repositories/SupabaseCategoryRepository";
import { Category } from "@/core/entities/Category";
import { Card, CardBody, Button, Chip } from "@heroui/react";
import { Plus, Trash2, Edit2, Tag } from "lucide-react";
import { FAB } from "@/presentation/components/common/FAB";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/presentation/utils/animations";

export default function CategoriesPage() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Mock data for now if DB is empty, or use repository
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
      // Try to fetch from DB, if fails (table might not exist), use mock
      try {
        const data = await categoryRepository.getAll(user.id);
        if (data.length > 0) {
          setCategories(data);
        } else {
          setMockCategories();
        }
      } catch (e) {
        console.warn("Using mock categories due to error:", e);
        setMockCategories();
      }
    } finally {
      setLoading(false);
    }
  };

  const setMockCategories = () => {
    setCategories([
      { id: "1", userId: "u1", name: "Comida", icon: "🍔", color: "primary", type: "expense", createdAt: new Date() },
      { id: "2", userId: "u1", name: "Transporte", icon: "🚌", color: "secondary", type: "expense", createdAt: new Date() },
      { id: "3", userId: "u1", name: "Salario", icon: "💰", color: "success", type: "income", createdAt: new Date() },
      { id: "4", userId: "u1", name: "Ocio", icon: "🎮", color: "warning", type: "expense", createdAt: new Date() },
    ]);
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
            custom={index} // Can be used for custom stagger if needed, but container handles it
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
                  <Button isIconOnly variant="light" size="sm" radius="full">
                    <Edit2 size={18} className="text-on-surface-variant" />
                  </Button>
                  <Button isIconOnly variant="light" size="sm" radius="full" color="danger">
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
        />
      </motion.div>
    </motion.div>
  );
}
