"use client";

import DashboardLayout from "@/presentation/components/layout/DashboardLayout";
import { useAuth } from "@/presentation/contexts/AuthContext";
import LoadingSpinner from "@/presentation/components/common/LoadingSpinner";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-container-low">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
