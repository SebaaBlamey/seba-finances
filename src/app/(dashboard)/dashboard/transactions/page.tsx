"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { SupabaseTransactionRepository } from "@/infraestructure/repositories/SupabaseTransactionRepository";
import {
  Transaction,
  CreateTransactionDTO,
  UpdateTransactionDTO,
} from "@/core/entities/Transaction";
import { TransactionList } from "@/presentation/components/transactions/TransactionList";
import AddTransactionModal from "@/presentation/components/transactions/AddTransactionModal";
import Modal from "@/presentation/components/common/Modal";
import { FAB } from "@/presentation/components/common/FAB";
import { Plus, Filter } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "@/presentation/utils/animations";

export default function TransactionsPage() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(
    null,
  );
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">(
    "all",
  );

  const transactionRepository = new SupabaseTransactionRepository();

  useEffect(() => {
    if (user) {
      loadTransactions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, filterType]);

  const loadTransactions = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await transactionRepository.getAll(user.id, {
        type: filterType === "all" ? undefined : filterType,
      });
      setTransactions(data);
    } catch (error) {
      console.error("Error loading transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (
    data: CreateTransactionDTO | UpdateTransactionDTO,
    id?: string,
  ) => {
    try {
      if (id) {
        const updatedTransaction = await transactionRepository.update(
          id,
          data as UpdateTransactionDTO,
        );
        setTransactions((prev) =>
          prev.map((t) => (t.id === id ? updatedTransaction : t)),
        );
      } else {
        const newTransaction = await transactionRepository.create(
          data as CreateTransactionDTO,
        );
        setTransactions((prev) => [newTransaction, ...prev]);
      }
      setIsModalOpen(false);
      setSelectedTransaction(null);
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const confirmDelete = (id: string) => {
    setTransactionToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!transactionToDelete) return;
    try {
      await transactionRepository.delete(transactionToDelete);
      setTransactions((prev) =>
        prev.filter((t) => t.id !== transactionToDelete),
      );
      setIsDeleteModalOpen(false);
      setTransactionToDelete(null);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <motion.div
      className="container mx-auto max-w-4xl p-4 pb-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header
        className="mb-8 flex items-center justify-between"
        variants={itemVariants}
      >
        <div>
          <h1 className="text-display-small font-bold text-on-surface dark:text-dark-on-surface">
            Transacciones
          </h1>
          <p className="text-body-large text-on-surface-variant dark:text-dark-on-surface-variant">
            Historial de movimientos
          </p>
        </div>

        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="flat"
              startContent={<Filter className="h-4 w-4" />}
              className="bg-surface-container-high dark:bg-dark-surface-container-high text-on-surface-variant dark:text-dark-on-surface-variant"
            >
              {filterType === "all"
                ? "Todos"
                : filterType === "income"
                  ? "Ingresos"
                  : "Gastos"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Filter transactions"
            onAction={(key) =>
              setFilterType(key as "all" | "income" | "expense")
            }
            selectedKeys={new Set([filterType])}
            selectionMode="single"
          >
            <DropdownItem key="all">Todos</DropdownItem>
            <DropdownItem key="income">Ingresos</DropdownItem>
            <DropdownItem key="expense">Gastos</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </motion.header>

      <motion.div variants={itemVariants}>
        <TransactionList
          transactions={transactions}
          isLoading={loading}
          onEdit={handleEdit}
          onDelete={confirmDelete}
        />
      </motion.div>

      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <FAB
          variant="primary"
          size="large"
          icon={<Plus className="h-8 w-8" />}
          aria-label="Add transaction"
          onClick={() => {
            setSelectedTransaction(null);
            setIsModalOpen(true);
          }}
        />
      </motion.div>

      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTransaction(null);
        }}
        onSave={handleSave}
        initialData={selectedTransaction}
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Eliminar Transacción"
        footer={
          <>
            <Button variant="ghost" onPress={() => setIsDeleteModalOpen(false)}>
              Cancelar
            </Button>
            <Button color="danger" onPress={handleDelete}>
              Eliminar
            </Button>
          </>
        }
      >
        <p>
          ¿Estás seguro de que deseas eliminar esta transacción? Esta acción no
          se puede deshacer.
        </p>
      </Modal>
    </motion.div>
  );
}
