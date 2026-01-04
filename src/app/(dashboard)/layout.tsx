"use client";
import LoadingSpinner from "@/presentation/components/common/LoadingSpinner";
import Modal from "@/presentation/components/common/Modal";
import Header from "@/presentation/components/layout/Header";
import Sidebar from "@/presentation/components/layout/Sidebar";
import Button from "@/presentation/components/common/Button";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { useNavigation } from "@/presentation/hooks/useNavigation";
import { useEffect, useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading, signOut } = useAuth();
  const { navigateTo } = useNavigation();
  const [signOutModalOpen, setSignOutModalOpen] = useState(false);
  const [mloading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignOutclick = () => setSignOutModalOpen(true);
  const handleConfirmSignOut = async () => {
    setLoading(true);
    setSignOutModalOpen(false);
    try {
      await signOut();
    } catch (error) {
      setError(
        `Error al cerrar sesión. Por favor, inténtalo de nuevo.\nDetalles: ${error instanceof Error ? error.message : "Error desconocido"}`,
      );
    } finally {
      setLoading(false);
    }
  };
  const handleCancelSignOut = () => setSignOutModalOpen(false);

  useEffect(() => {
    if (!loading && !user) {
      navigateTo("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar for Desktop */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header onSignOutClick={handleSignOutclick} mLoading={mloading} />
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">{children}</main>
      </div>

      <Modal
        isOpen={signOutModalOpen}
        onClose={handleCancelSignOut}
        title="Cerrar Sesión"
        footer={
          <>
            <Button
              variant="ghost"
              onClick={handleCancelSignOut}
              disabled={loading}
              className="text-primary"
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmSignOut}
              disabled={loading}
            >
              {loading ? "Cerrando..." : "Cerrar sesión"}
            </Button>
          </>
        }
      >
        <p className="text-body-large text-on-surface-variant">¿Estás seguro de que quieres cerrar tu sesión?</p>
      </Modal>
    </div>
  );
}
