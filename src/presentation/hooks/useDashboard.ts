import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { SupabaseTransactionRepository } from "@/infraestructure/repositories/SupabaseTransactionRepository";
import { GetDashboardDataUseCase, DashboardData } from "@/core/use-cases/dashboard/GetDashboardData";

export const useDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const repository = new SupabaseTransactionRepository();
        const useCase = new GetDashboardDataUseCase(repository);
        const result = await useCase.execute(user.id);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  return { data, loading, error };
};