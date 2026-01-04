export interface Transaction {
  id: string;
  userId: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
  date: Date;
  createdAt: Date;
}

export interface CreateTransactionDTO {
  userId: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
  date: Date;
}

export interface UpdateTransactionDTO {
  type?: "income" | "expense";
  amount?: number;
  description?: string;
  category?: string;
  date?: Date;
}

export interface TransactionFilters {
  type?: "income" | "expense";
  startDate?: Date;
  endDate?: Date;
  category?: string;
}

export interface MonthlySummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  month: number;
  year: number;
}

