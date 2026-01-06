import { MonthlySummary, Transaction } from "@/core/entities/Transaction";
import { ITransactionRepository } from "@/core/repositories/ITransactionRepository";

export interface DashboardData {
  monthlySummary: MonthlySummary;
  recentTransactions: Transaction[];
  incomeChangePercentage: number;
  expenseChangePercentage: number;
}

export class GetDashboardDataUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(userId: string): Promise<DashboardData> {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    let previousMonth = currentMonth - 1;
    let previousYear = currentYear;
    
    if (previousMonth === 0) {
      previousMonth = 12;
      previousYear = currentYear - 1;
    }

    const [monthlySummary, previousMonthlySummary, allTransactions] = await Promise.all([
      this.transactionRepository.getMonthlySummary(userId, currentMonth, currentYear),
      this.transactionRepository.getMonthlySummary(userId, previousMonth, previousYear),
      this.transactionRepository.getAll(userId),
    ]);

    const recentTransactions = allTransactions.slice(0, 10);

    const incomeChangePercentage = this.calculatePercentageChange(
      previousMonthlySummary.totalIncome,
      monthlySummary.totalIncome
    );

    const expenseChangePercentage = this.calculatePercentageChange(
      previousMonthlySummary.totalExpenses,
      monthlySummary.totalExpenses
    );

    return {
      monthlySummary,
      recentTransactions,
      incomeChangePercentage,
      expenseChangePercentage,
    };
  }

  private calculatePercentageChange(previousValue: number, currentValue: number): number {
    if (previousValue === 0) {
      return currentValue > 0 ? 100 : 0;
    }
    return ((currentValue - previousValue) / previousValue) * 100;
  }
}