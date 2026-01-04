"use client";

import LoadingSpinner from "@/presentation/components/common/LoadingSpinner";
import { useAuth } from "@/presentation/contexts/AuthContext";
import { useNavigation } from "@/presentation/hooks/useNavigation";
import { useEffect } from "react";

export default function HomePage() {
  const { user, loading } = useAuth();
  const { navigateTo } = useNavigation();

  useEffect(() => {
    if (!loading) {
      if (user) {
        navigateTo("/dashboard");
      } else {
        navigateTo("/login");
      }
    }
  }, [user, loading]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <LoadingSpinner size="large" />
    </div>
  );
}
