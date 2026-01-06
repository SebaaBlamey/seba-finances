import React from "react";
import { Transaction } from "@/core/entities/Transaction";
import { Card, CardContent } from "@/presentation/components/common/Card";
import { formatCurrency, formatDate } from "@/presentation/utils/format";
import { ArrowDownLeft, ArrowUpRight, MoreVertical } from "lucide-react";
import { cn } from "@heroui/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";

interface TransactionItemProps {
  transaction: Transaction;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (id: string) => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onEdit,
  onDelete,
}) => {
  const isIncome = transaction.type === "income";

  return (
    <Card
      variant="elevated"
      className="mb-3 bg-surface-container-low dark:bg-dark-surface-container-low hover:bg-surface-container-high dark:hover:bg-dark-surface-container-high transition-colors cursor-pointer group border border-outline-variant dark:border-dark-outline-variant"
    >
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-[12px]",
              isIncome
                ? "bg-success-container/20 dark:bg-dark-success-container/20 text-success dark:text-dark-success"
                : "bg-error-container/20 dark:bg-dark-error-container/20 text-error dark:text-dark-error"
            )}
          >
            {isIncome ? (
              <ArrowDownLeft className="h-5 w-5" />
            ) : (
              <ArrowUpRight className="h-5 w-5" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-body-large font-medium text-on-surface dark:text-dark-on-surface">
              {transaction.description}
            </span>
            <span className="text-body-small text-on-surface-variant dark:text-dark-on-surface-variant">
              {transaction.category} • {formatDate(transaction.date)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span
            className={cn(
              "text-body-large font-semibold",
              isIncome ? "text-success dark:text-dark-success" : "text-error dark:text-dark-error"
            )}
          >
            {isIncome ? "+" : "-"} {formatCurrency(transaction.amount)}
          </span>

          <Dropdown>
            <DropdownTrigger>
              <Button
                isIconOnly
                variant="light"
                className="text-on-surface-variant dark:text-dark-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Transaction actions">
              <DropdownItem key="edit" onPress={() => onEdit?.(transaction)}>
                Editar
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-error dark:text-dark-error"
                color="danger"
                onPress={() => onDelete?.(transaction.id)}
              >
                Eliminar
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardContent>
    </Card>
  );
};
