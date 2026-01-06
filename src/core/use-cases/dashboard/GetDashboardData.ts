import { MonthlySummary, Transaction } from "@/core/entities/Transaction";
import { ITransactionRepository } from "@/core/repositories/ITransactionRepository";

export interface DashboardData {
  monthlySummary: MonthlySummary;
  recentTransactions: Transaction[];
}

export class GetDashboardDataUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(userId: string): Promise<DashboardData> {
    const now = new Date();
    const month = now.getMonth() + 1; // getMonth() is 0-based
    const year = now.getFullYear();

    const [monthlySummary, allTransactions] = await Promise.all([
      this.transactionRepository.getMonthlySummary(userId, month, year),
      this.transactionRepository.getAll(userId),
    ]);

    const recentTransactions = allTransactions.slice(0, 10);

    return {
      monthlySummary,
      recentTransactions,
    };
  }
}