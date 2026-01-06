"use client";

import { Card, CardBody, Button, Spinner } from "@heroui/react";
import { Plus, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
} from "@/presentation/utils/animations";
import { useDashboard } from "@/presentation/hooks/useDashboard";
import { formatDateShort } from "@/presentation/utils/format";

export default function DashboardPage() {
  const router = useRouter();
  const { data, loading, error } = useDashboard();

  return (
    <motion.div
      className="space-y-8 p-4 sm:p-8 max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="md:col-span-3 lg:col-span-1"
          variants={itemVariants}
        >
          <Card className="bg-primary-container dark:bg-dark-primary-container text-on-primary-container dark:text-dark-on-primary-container shadow-md rounded-[28px] h-full border-2 border-transparent dark:border-dark-primary-border">
            <CardBody className="p-8 flex flex-col justify-between h-full min-h-[200px]">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-title-medium font-medium text-on-primary-container dark:text-dark-on-surface-variant opacity-80">
                    Balance Total
                  </p>
                  <div className="text-display-medium font-normal mt-2 text-on-primary-container dark:text-dark-on-primary-container">
                    {loading ? (
                      <Spinner size="sm" />
                    ) : (
                      data?.monthlySummary.balance?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      }) || "$0.00"
                    )}
                  </div>
                </div>
                <div className="bg-on-primary-container/10 dark:bg-dark-on-primary-container/10 p-3 rounded-full">
                  <Wallet className="w-8 h-8" />
                </div>
              </div>
              <div className="mt-4">
                <Button
                  className="bg-on-primary-container dark:bg-dark-primary text-primary-container dark:text-dark-on-primary font-medium"
                  radius="full"
                  startContent={<Plus size={20} />}
                  onPress={() => router.push("/dashboard/transactions")}
                >
                  Nueva Transacción
                </Button>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-surface-container-high dark:bg-dark-surface-container-high shadow-sm rounded-[24px] h-full border border-outline-variant dark:border-dark-outline-variant border-l-4 border-l-success dark:border-l-dark-success-border">
            <CardBody className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-success-container dark:bg-dark-success-container/20 p-3 rounded-full text-on-success-container dark:text-dark-success-border">
                  <TrendingUp size={24} />
                </div>
                <span className="text-title-medium font-medium text-on-surface-variant dark:text-dark-on-surface-variant">
                  Ingresos
                </span>
              </div>
              <div className="text-headline-medium font-normal text-on-surface dark:text-dark-on-surface">
                {loading ? (
                  <Spinner size="sm" />
                ) : (
                  data?.monthlySummary.totalIncome?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  }) || "$0.00"
                )}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`${
                    (data?.incomeChangePercentage ?? 0) >= 0
                      ? "bg-success/10 dark:bg-dark-success-container text-success dark:text-dark-success"
                      : "bg-error/10 dark:bg-dark-error-container text-error dark:text-dark-error"
                  } px-2 py-1 rounded-md text-label-medium font-medium`}
                >
                  {(data?.incomeChangePercentage ?? 0) >= 0 ? "+" : ""}
                  {data?.incomeChangePercentage?.toFixed(1) ?? "0.0"}%
                </span>
                <span className="text-body-small text-on-surface-variant dark:text-dark-on-surface-variant">
                  vs mes anterior
                </span>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-surface-container-high dark:bg-dark-surface-container-high shadow-sm rounded-[24px] h-full border border-outline-variant dark:border-dark-outline-variant border-l-4 border-l-error dark:border-l-dark-error-border">
            <CardBody className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-error-container dark:bg-dark-error-container/20 p-3 rounded-full text-on-error-container dark:text-dark-error-border">
                  <TrendingDown size={24} />
                </div>
                <span className="text-title-medium font-medium text-on-surface-variant dark:text-dark-on-surface-variant">
                  Gastos
                </span>
              </div>
              <div className="text-headline-medium font-normal text-on-surface dark:text-dark-on-surface">
                {loading ? (
                  <Spinner size="sm" />
                ) : (
                  data?.monthlySummary.totalExpenses?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  }) || "$0.00"
                )}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`${
                    (data?.expenseChangePercentage ?? 0) <= 0
                      ? "bg-success/10 dark:bg-dark-success-container text-success dark:text-dark-success"
                      : "bg-error/10 dark:bg-dark-error-container text-error dark:text-dark-error"
                  } px-2 py-1 rounded-md text-label-medium font-medium`}
                >
                  {(data?.expenseChangePercentage ?? 0) >= 0 ? "+" : ""}
                  {data?.expenseChangePercentage?.toFixed(1) ?? "0.0"}%
                </span>
                <span className="text-body-small text-on-surface-variant dark:text-dark-on-surface-variant">
                  vs mes anterior
                </span>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>

      <motion.div className="space-y-4" variants={itemVariants}>
        <div className="flex justify-between items-center">
          <h3 className="text-headline-small text-on-surface dark:text-dark-on-surface">
            Movimientos Recientes
          </h3>
          <Button
            variant="ghost"
            className="text-primary dark:text-dark-primary font-medium"
            onPress={() => router.push("/dashboard/transactions")}
          >
            Ver todos
          </Button>
        </div>

        <div className="bg-surface-container dark:bg-dark-surface-container rounded-[24px] overflow-hidden shadow-sm border border-outline-variant dark:border-dark-outline-variant">
          {loading ? (
            <div className="p-8 text-center">
              <Spinner size="lg" />
            </div>
          ) : error ? (
            <div className="p-8 text-center text-error dark:text-dark-error">
              <p className="text-body-large">
                Error al cargar movimientos: {error}
              </p>
            </div>
          ) : data?.recentTransactions && data.recentTransactions.length > 0 ? (
            <div className="divide-y divide-outline-variant dark:divide-dark-outline-variant">
              {data.recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-4 flex items-center justify-between bg-surface-container-low dark:bg-dark-surface-container-low hover:bg-surface-container-high dark:hover:bg-dark-surface-container-high transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-[12px] ${
                        transaction.type === "income"
                          ? "bg-success-container/20 dark:bg-dark-success-container/20 text-success dark:text-dark-success"
                          : "bg-error-container/20 dark:bg-dark-error-container/20 text-error dark:text-dark-error"
                      }`}
                    >
                      {transaction.type === "income" ? (
                        <TrendingUp size={20} />
                      ) : (
                        <TrendingDown size={20} />
                      )}
                    </div>
                    <div>
                      <p className="text-body-large font-medium text-on-surface dark:text-dark-on-surface">
                        {transaction.description}
                      </p>
                      <p className="text-body-small text-on-surface-variant dark:text-dark-on-surface-variant">
                        {transaction.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-body-large font-medium ${
                        transaction.type === "income"
                          ? "text-success dark:text-dark-success"
                          : "text-error dark:text-dark-error"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {transaction.amount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                    <p className="text-body-small text-on-surface-variant dark:text-dark-on-surface-variant">
                      {formatDateShort(transaction.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-on-surface-variant dark:text-dark-on-surface-variant">
              <p className="text-body-large">No hay movimientos recientes</p>
              <Button
                variant="light"
                color="primary"
                className="mt-2"
                onPress={() => router.push("/dashboard/transactions")}
              >
                Agregar el primero
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
