import React from "react";
import { Transaction } from "@/core/entities/Transaction";
import { TransactionItem } from "./TransactionItem";
import { TransactionsListSkeleton } from "@/presentation/components/common/LoadingComponents";
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
    return <TransactionsListSkeleton count={5} />;
  }

  if (transactions.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.2, 
            duration: 0.4,
            type: "spring",
            stiffness: 200 
          }}
          className="mb-4 rounded-full bg-surface-container-highest p-4"
        >
          <span className="text-4xl">💸</span>
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-title-medium font-medium text-on-surface"
        >
          No hay transacciones
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-body-medium text-on-surface-variant"
        >
          Comienza agregando tu primer ingreso o gasto
        </motion.p>
      </motion.div>
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
