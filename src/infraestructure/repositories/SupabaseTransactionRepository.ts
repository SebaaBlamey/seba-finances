import {
  CreateTransactionDTO,
  MonthlySummary,
  Transaction,
  TransactionFilters,
  UpdateTransactionDTO,
} from "@/core/entities/Transaction";
import { ITransactionRepository } from "@/core/repositories/ITransactionRepository";
import { supabase } from "@/infrastructure/services/supabase/client";

export class SupabaseTransactionRepository implements ITransactionRepository {
  async create(data: CreateTransactionDTO): Promise<Transaction> {
    const { data: insertedData, error } = await supabase
      .from("transactions")
      .insert({
        user_id: data.userId,
        type: data.type,
        amount: data.amount,
        description: data.description,
        category: data.category,
        date: data.date,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return {
      ...insertedData,
      userId: insertedData.user_id,
      date: new Date(insertedData.date),
      createdAt: new Date(insertedData.created_at),
    } as Transaction;
  }

  async getAll(
    userId: string,
    filters?: TransactionFilters,
  ): Promise<Transaction[]> {
    let query = supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false });

    if (filters) {
      if (filters.type) {
        query = query.eq("type", filters.type);
      }
      if (filters.category) {
        query = query.eq("category", filters.category);
      }
      if (filters.startDate) {
        query = query.gte("date", filters.startDate.toISOString());
      }
      if (filters.endDate) {
        query = query.lte("date", filters.endDate.toISOString());
      }
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);

    return data.map((item) => ({
      ...item,
      userId: item.user_id,
      date: new Date(item.date),
      createdAt: new Date(item.created_at),
    })) as Transaction[];
  }

  async getById(id: string): Promise<Transaction | null> {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;

    return {
      ...data,
      userId: data.user_id,
      date: new Date(data.date),
      createdAt: new Date(data.created_at),
    } as Transaction;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from("transactions").delete().eq("id", id);

    if (error) throw new Error(error.message);
  }

  async update(id: string, data: UpdateTransactionDTO): Promise<Transaction> {
    const { data: updatedData, error } = await supabase
      .from("transactions")
      .update({
        ...data,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return {
      ...updatedData,
      userId: updatedData.user_id,
      date: new Date(updatedData.date),
      createdAt: new Date(updatedData.created_at),
    } as Transaction;
  }

  async getMonthlySummary(
    userId: string,
    month: number,
    year: number,
  ): Promise<MonthlySummary> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const transactions = await this.getAll(userId, {
      startDate,
      endDate,
    });

    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, curr) => acc + curr.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, curr) => acc + curr.amount, 0);

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      month,
      year,
    };
  }
}
