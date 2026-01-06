"use client";

import { Card, CardBody, Button, Spinner } from "@heroui/react";
import { Plus, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/presentation/utils/animations";
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
      {/* Hero Section - Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div className="md:col-span-3 lg:col-span-1" variants={itemVariants}>
          <Card className="bg-primary-container text-on-primary-container shadow-md rounded-[28px] h-full">
            <CardBody className="p-8 flex flex-col justify-between h-full min-h-[200px]">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-title-medium font-medium opacity-80">Balance Total</p>
                  <h2 className="text-display-medium font-normal mt-2">
                    {loading ? (
                      <Spinner size="sm" />
                    ) : (
                      data?.monthlySummary.balance?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) || '$0.00'
                    )}
                  </h2>
                </div>
                <div className="bg-on-primary-container/10 p-3 rounded-full">
                  <Wallet className="w-8 h-8" />
                </div>
              </div>
              <div className="mt-4">
                <Button 
                  className="bg-on-primary-container text-primary-container font-medium" 
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
          <Card className="bg-surface-container shadow-sm rounded-[24px] h-full">
            <CardBody className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-success-container p-3 rounded-full text-on-success-container">
                  <TrendingUp size={24} />
                </div>
                <span className="text-title-medium font-medium text-on-surface-variant">Ingresos</span>
              </div>
              <p className="text-headline-medium font-normal text-on-surface">
                {loading ? (
                  <Spinner size="sm" />
                ) : (
                  data?.monthlySummary.totalIncome?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) || '$0.00'
                )}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="bg-success/10 text-success px-2 py-1 rounded-md text-label-medium font-medium">+12.5%</span>
                <span className="text-body-small text-on-surface-variant">vs mes anterior</span>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-surface-container shadow-sm rounded-[24px] h-full">
            <CardBody className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-error-container p-3 rounded-full text-on-error-container">
                  <TrendingDown size={24} />
                </div>
                <span className="text-title-medium font-medium text-on-surface-variant">Gastos</span>
              </div>
              <p className="text-headline-medium font-normal text-on-surface">
                {loading ? (
                  <Spinner size="sm" />
                ) : (
                  data?.monthlySummary.totalExpenses?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) || '$0.00'
                )}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="bg-success/10 text-success px-2 py-1 rounded-md text-label-medium font-medium">-5.2%</span>
                <span className="text-body-small text-on-surface-variant">vs mes anterior</span>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div className="space-y-4" variants={itemVariants}>
        <div className="flex justify-between items-center">
          <h3 className="text-headline-small text-on-surface">Movimientos Recientes</h3>
          <Button 
            variant="ghost" 
            className="text-primary font-medium"
            onPress={() => router.push("/dashboard/transactions")}
          >
            Ver todos
          </Button>
        </div>
        
        <div className="bg-surface-container-low rounded-[24px] overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-8 text-center">
              <Spinner size="lg" />
            </div>
          ) : error ? (
            <div className="p-8 text-center text-error">
              <p className="text-body-large">Error al cargar movimientos: {error}</p>
            </div>
          ) : data?.recentTransactions && data.recentTransactions.length > 0 ? (
            <div className="divide-y divide-outline-variant">
              {data.recentTransactions.map((transaction) => (
                <div key={transaction.id} className="p-4 flex items-center justify-between hover:bg-surface-container transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'income' 
                        ? 'bg-success-container text-on-success-container' 
                        : 'bg-error-container text-on-error-container'
                    }`}>
                      {transaction.type === 'income' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                    </div>
                    <div>
                      <p className="text-body-large font-medium text-on-surface">{transaction.description}</p>
                      <p className="text-body-small text-on-surface-variant">{transaction.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-body-large font-medium ${
                      transaction.type === 'income' ? 'text-success' : 'text-error'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}
                      {transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </p>
                    <p className="text-body-small text-on-surface-variant">
                      {formatDateShort(transaction.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-on-surface-variant">
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
