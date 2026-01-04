import React from "react";
import { Transaction } from "@/core/entities/Transaction";
import { TransactionItem } from "./TransactionItem";
import { motion } from "framer-motion";

interface TransactionListProps {
  transactions: Transaction[];
  isLoading?: boolean;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (id: string) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  isLoading,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-20 w-full animate-pulse rounded-[20px] bg-surface-container-highest"
          />
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 rounded-full bg-surface-container-highest p-4">
          <span className="text-4xl">💸</span>
        </div>
        <h3 className="text-title-medium font-medium text-on-surface">
          No hay transacciones
        </h3>
        <p className="text-body-medium text-on-surface-variant">
          Comienza agregando tu primer ingreso o gasto
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {transactions.map((transaction, index) => (
        <motion.div
          key={transaction.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.05,
            ease: [0.2, 0.0, 0, 1.0], // Standard easing
          }}
        >
          <TransactionItem
            transaction={transaction}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </motion.div>
      ))}
    </div>
  );
};
