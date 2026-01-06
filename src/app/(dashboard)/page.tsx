import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Finanzas de Seba",
  description: "Dashboard principal de finanzas personales",
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-headline-large text-on-surface">
          Dashboard Content
        </h1>
        <p className="text-body-large text-on-surface-variant mt-4">
          Aquí irán las stats cards y movimientos recientes (Phase 2 y 3)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-container-high rounded-xl p-6 shadow-sm">
          <h3 className="text-title-medium text-on-surface mb-2">Card 1</h3>
          <p className="text-body-medium text-on-surface-variant">
            Placeholder para Stats Card
          </p>
        </div>
        <div className="bg-surface-container-high rounded-xl p-6 shadow-sm">
          <h3 className="text-title-medium text-on-surface mb-2">Card 2</h3>
          <p className="text-body-medium text-on-surface-variant">
            Placeholder para Stats Card
          </p>
        </div>
        <div className="bg-surface-container-high rounded-xl p-6 shadow-sm">
          <h3 className="text-title-medium text-on-surface mb-2">Card 3</h3>
          <p className="text-body-medium text-on-surface-variant">
            Placeholder para Stats Card
          </p>
        </div>
      </div>

      <div className="bg-surface-container-high rounded-xl p-6 shadow-sm">
        <h2 className="text-headline-small text-on-surface mb-4">
          Movimientos Recientes
        </h2>
        <p className="text-body-large text-on-surface-variant">
          Esta sección mostrará los movimientos recientes en Phase 3
        </p>
      </div>
    </div>
  );
}
