"use client";

import { Card, CardBody, Button } from "@heroui/react";
import { Plus, TrendingUp, TrendingDown, Wallet } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-4 sm:p-8 max-w-7xl mx-auto">
      {/* Hero Section - Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary-container text-on-primary-container shadow-md rounded-[28px] md:col-span-3 lg:col-span-1">
          <CardBody className="p-8 flex flex-col justify-between h-full min-h-[200px]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-title-medium font-medium opacity-80">Balance Total</p>
                <h2 className="text-display-medium font-normal mt-2">$7,190.00</h2>
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
              >
                Nueva Transacción
              </Button>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-surface-container shadow-sm rounded-[24px]">
          <CardBody className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-success-container p-3 rounded-full text-on-success-container">
                <TrendingUp size={24} />
              </div>
              <span className="text-title-medium font-medium text-on-surface-variant">Ingresos</span>
            </div>
            <p className="text-headline-medium font-normal text-on-surface">$15,420.00</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="bg-success/10 text-success px-2 py-1 rounded-md text-label-medium font-medium">+12.5%</span>
              <span className="text-body-small text-on-surface-variant">vs mes anterior</span>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-surface-container shadow-sm rounded-[24px]">
          <CardBody className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-error-container p-3 rounded-full text-on-error-container">
                <TrendingDown size={24} />
              </div>
              <span className="text-title-medium font-medium text-on-surface-variant">Gastos</span>
            </div>
            <p className="text-headline-medium font-normal text-on-surface">$8,230.00</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="bg-success/10 text-success px-2 py-1 rounded-md text-label-medium font-medium">-5.2%</span>
              <span className="text-body-small text-on-surface-variant">vs mes anterior</span>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-headline-small text-on-surface">Movimientos Recientes</h3>
          <Button variant="ghost" className="text-primary font-medium">Ver todos</Button>
        </div>
        
        <div className="bg-surface-container-low rounded-[24px] overflow-hidden shadow-sm">
          {/* Placeholder for transaction list */}
          <div className="p-8 text-center text-on-surface-variant">
            <p className="text-body-large">No hay movimientos recientes</p>
            <Button variant="light" color="primary" className="mt-2">
              Agregar el primero
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
