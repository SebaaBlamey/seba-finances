import {
  CreateTransactionDTO,
  MonthlySummary,
  Transaction,
  TransactionFilters,
  UpdateTransactionDTO,
} from "@/core/entities/Transaction";
import { ITransactionRepository } from "@/core/repositories/ITransactionRepository";
import { createClient } from "../services/supabase/server";

export class SupabaseTransactionRepository implements ITransactionRepository {
  async create(data: CreateTransactionDTO): Promise<Transaction> {
    const supabase = await createClient();
    const { data: insertedData, error } = await supabase
      .from("transactions")
      .insert({
        userId: data.userId,
        type: data.type,
        amount: data.amount,
        description: data.description,
        category: data.category,
        date: data.date,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return insertedData as Transaction;
  }

  async getAll(
    userId: string,
    filters?: TransactionFilters,
  ): Promise<Transaction[]> {
    // TODO
    throw new Error("Method not implemented.");
  }

  async getById(id: string): Promise<Transaction | null> {
    // TODO
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    // TODO
    throw new Error("Method not implemented.");
  }
  async update(id: string, data: UpdateTransactionDTO): Promise<Transaction> {
    // TODO
    throw new Error("Method not implemented.");
  }

  async getMonthlySummary(
    userId: string,
    month: number,
    year: number,
  ): Promise<MonthlySummary> {
    // TODO
    throw new Error("Method not implemented.");
  }
}
